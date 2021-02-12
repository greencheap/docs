# Database
<p class = "uk-article-lead"> this episode, configure the database connection, create a table, from extensions, the basics of running database scripts and manually creating database queries are mentioned. </p>

**Note** Recommended way to conveniently map your application data to database tables, GreenCheap Object-relational mapper (ORM) method that is open in its section.


## Configuration
Database credentials are stored in `config.php`. GreenCheap `mysql`, `sqlite` and `postgresql` supports.

```
'database' => [
    'connections' => [
      'mysql' => [
        'host' => 'localhost',
        'user' => 'root',
        'password' => 'PASSWORD',
        'dbname' => 'DATABASE',
        'prefix' => 'PREFIX_',
      ],
    ],
  ],
  ...
```

## Working with database prefixes

All table names, Includes the prefix of your GreenCheap installation. To dynamically address tables at the back end, use the table name with the symbol ` @ ' as a placeholder for the prefix. As a rule, you must initialize the table name with your extension name, etc. _options_ table for `foobar` extension: `@foobar_option`

## Database utility

You can manage your database schema by using the database service utility(See examples below).

```
$util = $this['db']->getUtility();
```

## Check for tables

```
if ($util->tablesExist(['@table1', '@table2'])) {
  // tables exists
}
```

## Create Table

Use `Utility :: createTable ($ table, \ Closure $ callback)` to create a table, the first parameter passed to callback will be an instance of `Doctrine\DBAL\Schema\Table`.

```
$util->createTable('@foobar_option', function($table) {
    $table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
    $table->addColumn('name', 'string', ['length' => 64, 'default' => '']);
    $table->addColumn('value', 'text');
    $table->addColumn('autoload', 'boolean', ['default' => false]);
    $table->setPrimaryKey(['id']);
    $table->addUniqueIndex(['name'], 'OPTION_NAME');
});
```

object `$table` is an instance of `\Doctrine\DBAL\Schema\Table`. [class reference](http://www.doctrine-project.org/api/dbal/2.5/class-Doctrine.DBAL.Schema.Table.html) you can find it in official doctrine documents.


when creating a column using `addColumn`, you may want to look at available [data types](http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/types.html) and also [column options](http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/schema-representation.html#portable-options) found in Doctrine documents

Creating a table usually `scripts` within your extension.done on php's `install` hook. Learn more about [Migrations](#migrations) in the next section.


## Migration

Database migration, your extension ' scripts. Defined in the `'updates'` section of `scripts.php` in your extension. A full example for [scripts.php](https://github.com/greencheap/extension-hello/blob/master/scripts.php) can be found in Hello extension. Don't forget to link this file from `composer.json` to actually execute it:

```
    "extra": {
       "scripts": "scripts.php"
    },
```

in `commands.php`, you can connect to different events of the extension life cycle.

| Event hook      | Description       |
| ----------- | -------------- |

| `install` | Invoked when extension is loaded. You usually create your tables here.
| `enable` | Invoked when extension is enabled in Administrator field.
| `uninstall` | Invoked when the extension is removed. This means that you will collect everything you create, so this is where you will leave all the tables of your extension.
| `enable` | Run any code when your extension is updated. Expect an array where each key is the version number that this code should run. 

Example:

    ```
     /*
     * Runs all updates that are newer than the current version.
     *
     */
    'updates' => [
        '0.5.0' => function ($app) {
            // executed when upgrading from a version older than 0.5.0
        },
        '0.9.0' => function ($app) {
            // executed when upgrading from a version older than 0.9.0
        },
    ],
    ```

### Change an existing table

To replace an existing table, use the existing tools of basic Doctrine DBAL. To add a column to an existing table, you can include the following snippets in one of the `updates` version hooks of your extension's `scripts.php` file.

```
use Doctrine\DBAL\Schema\Comparator;

// ...

$util    = App::db()->getUtility();
$manager = $util->getSchemaManager();

if ($util->tableExists('@my_table')) {

    $tableOld = $util->getTable('@my_table');
    $table = clone $tableOld;

    $table->addColumn('title', 'string', ['length' => 255]);

    $comparator = new Comparator;
    $manager->alterTable($comparator->diffTable($tableOld, $table));
}

```


object `$table` is an instance of `\Doctrine\DBAL\Schema\Table`. [class reference](http://www.doctrine-project.org/api/dbal/2.5/class-Doctrine.DBAL.Schema.Table.html) you can find it in official doctrine documents.


## Querys

There are several ways to access the database. GreenCheap, provides a summary on the underlying MySQL or SQLite, therefore, there is no need to use PDO or similar mechanisms.


### 1. Query builder

[QueryBuilder](https://github.com/greencheap/greencheap/blob/develop/app/modules/database/src/Query/QueryBuilder.php), provides a more convenient way to create queries.

Example:

```
$result = Application::db()->createQueryBuilder()->select('*')->from('@blog_post')->where('id = :id', ['id' => 1])->execute()->fetchAll();
```


#### Get the query builder object

```
use GreenCheap\Application;

// ...

$query = Application::db()->createQueryBuilder();
```

#### Basic choices and conditions

 
Method   | description
-------- | -----------
`select($columns = ['*'])` | Creates and adds a "selection" to the query.
`from($table)` | Creates and sets a "from" query.
`nerede ($ koşul, dizi $ parametreler = [])` | Creates and adds a "Where" to the query.
`orWhere ($ koşul, dizi $ parametreler = [])` | Creates and adds an "Or where" to the query.

Örnek:

```
// create query
$query = Application::db()->createQueryBuilder();

// fetch title and content of all blog posts that do not have any comments
$comments = $query
    ->select(['title', 'content'])
    ->from('@blog_post')
    ->where('comment_count = ?', [0])
    ->get();
```

#### Query execution

Method          | description
--------        | -----------
`get ($ sütunlar = ['*'])` | Execute the query and get all the results.
`first ($ sütunlar = ['*'])` | Execute the query and get the first result.
`count ($ sütun = '*')` | Execute the query and get the result "count".
`run ($ sütunlar = ['*'])` | Execute the" SELECT " query.
`update (dizi $ değerler)` | Execute" update " query with given values.
`delete ()` | Execute the" delete " query.


#### Aggregate functions


Method         | Description
-------------- | -----------
`min($column)` | Execute the query and get the result "min".
`max($column)` | Execute the query and get the" maximum " result.
`sum($column)` | Execute the query and get the result "total".
`avg($column)` | Execute query and get" avg " result.

Example:

```
// create query
$query = $query = Application::db()->createQueryBuilder();

// determine total number of blog comments
$count = $query
    ->select(['comment_count'])
    ->from('@blog_post')
    ->sum('comment_count');
```

#### Advanced query methods



Method  | descriptions
-------- | -----------
`whereIn($column, $values, $not = false, $type = null)` | Creates and adds "Where" to the query.
`orWhereIn($column, $values, $not = false)` | Creates and adds an "OR where" to the query.
`whereExists($callback, $not = false, $type = null)` | Creates and adds "Where" to the query.
`orWhereExists(Closure $callback, $not = false)`| Creates and adds A "or where it exists" to the query.
`whereInSet($column, $values, $not = false, $type = null)`| Creates and adds an equivalent "where FIND_IN_SET" to the query.
`groupBy($groupBy)` | Creates and adds a "grouping criteria" to the query.
`having($having, $type = null)` | Creates and adds an "ownership" to the query.
`orHaving($having)` | Creates and adds A "or owner" to the query.
`orderBy($sort, $order = null)` | Creates and adds a "sort" to the query.
`offset($offset)`| Sets the distance of the query; this is not the first result of the results, result means that the integer index will start with the result defined by `$offset`. This is useful for paging.
`limit($limit)` | Specifies the limit of the query. `$limit` defines the maximum number of results to be returned.
`getSQL()` | Gets the SQL query.


#### Joining

Method   | Descriptions
-------- | -----------
`join($table, $condition = null, $type = 'inner')` | Creates and adds a "join" to the query.
`innerJoin($table, $condition = null)`| Creates and adds an "inner join" to the query.
`leftJoin($table, $condition = null)` | 
`rightJoin($table, $condition = null)` | Creates and adds a "correct join" to the query.


### 2. ORM Querys


When you install [ORM](orm.md) in your extension, you can create highly readable queries using your model class.

Example:

```
$result = Role::where(['id <> ?'], [Role::ROLE_ANONYMOUS])->orderBy('priority')->get();
```

The following methods are available. ([ModelTrait](https://github.com/greencheap/greencheap/blob/develop/app/modules/database/src/ORM/ModelTrait.php) defined in).

Method  | Descriptions
-------- | -----------
`create($data = [])` | Creates a new instance of this model that is passed in the data array.
`where($condition, array $params = [])` | Specify a Where condition. Question marks in the condition, replaced with the parameters you pass. Returns a "` QueryBuilder ' object, so you can chain method calls for more specific queries. Example: `User::where(['name = ?'], ['peter'])`
`find($id)` | Gets the existence of a model by its identifier.
`findAll()`| Takes all assets of this model.
`save(array $data = [])` | Records model presence.
`delete()` | Deletes Model presence.
`toArray(array $data = [], array $ignore = [])` | Returns Model data as an array. pass a list of property keys to include as the `$data` parameter. pass a list of property keys to exclude as the `$ignore` parameter.
`query()` | Returns an instance of `Orm\QueryBuilder` to use any method from this class. This example presents all the methods in the regular query builder, as well as some attachments specifically for ORM.


#### Orm Query Builder: Additional methods

Method   | Descriptions
-------- | -----------
`get()` | Executes the query and gets all the results.
`first()` | Executes the query and gets the first result.
`related($related)` | Adjust relationships to be enthusiastic.
`getRelations()` | Gets all the relationships of the query.
`getNestedRelations($relation)`  | Gets all nested relationships of the query.

Example:

```
$comments = Comment::query()->related(['post' => function ($query) {
    return $query->related('comments');
}])->get();
```

### 3. Raw queries

The simplest way to query the database, sending raw queries to the database. This is basically just a wrapper around the PDO.

```
$result = Application::db()->executeQuery('select * from @blog_post')->fetchAll();
$result = Application::db()->executeQuery('select * from @blog_post WHERE id = :id', ['id' => 1])->fetchAll();
```

## Add

Add data to the database, The database connection that you can get through 'Application:: db()` can be made using the instance at the top of your file `use GreenCheap\Application;`.

`insert($tableExpression, array $data, array $types = array())`use method.


Example:

```
Application::db()->insert('@system_page', [
    'title' => 'Home',
    'content' => "<p>Hello World</p>",
    'data' => '{"title":true}'
]);
```

[ORM](#ORM) when using, you just need to create a new model instance and call the `save()` method.

## ORM

With Object Relational Mapping (Orm) in Greencheap, you can link a Model class to a database table. Installing this takes a few more lines from Querybuilder, ORM takes a lot of manual work out of your hands. Using ORM, recommended way to manage how you store and retrieve your application data from the database. [GreenCheap ORM](orm.md) learn more about.