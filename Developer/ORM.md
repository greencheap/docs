<p class = "uk-article-lead"> Green Cheap object-relational mapper (ORM), helps you create model classes of your application data where each property is automatically mapped to the appropriate table column. You can also define relationships between your assets and existing assets from Greencheap (i.e. users). </p>

## İnstall

### Create table

The following, so run your extension on the `install` hook of the `scripts.php` file. Tablo oluşturma hakkında daha genel bilgi için [veritabanı bölümü'ne](database.md) bakın.For more general information about creating a table, see the [database section](database.md)

Example:

```php
$util = $app['db']->getUtility();

if ($util->tableExists('@forum_topics') === false) {
    $util->createTable('@forum_topics', function ($table) {
        $table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
        $table->addColumn('user_id', 'integer', ['unsigned' => true, 'length' => 10, 'default' => 0]);
        $table->addColumn('title', 'string', ['length' => 255, 'default' => '']);
        $table->addColumn('date', 'datetime');
        $table->addColumn('modified', 'datetime', ['notnull' => false]);
        $table->addColumn('content', 'text');
        $table->addIndex(['user_id'], 'FORUM_TOPIC_USER_ID');
        $table->setPrimaryKey(['id']);
    });
}
```

### Define Model class

Example:

```
<?php

namespace GreenCheap\Forum\Model;

use GreenCheap\Database\ORM\ModelTrait;

/**
 * @Entity(tableClass="@forum_topics")
 */
class Topic
{

    use ModelTrait;

    /** @Column(type="integer") @Id */
    public $id;

    /** @Column */
    public $title = '';

    /** @Column(type="datetime") */
    public $date;

    /** @Column(type="text") */
    public $content = '';

    /** @Column(type="integer") */
    public $user_id;

    /**
     * @BelongsTo(targetEntity="GreenCheap\User\Model\User", keyFrom="user_id")
     */
    public $user;

}

```

Model is a flat PHP class that uses the `GreenCheap\Database\Orm\ModelTrait` property. Properties allow to include certain behaviors in a class, similar to simple class inheritance. The main difference is that a class can use multiple properties and inherit only from a single class.

**Note** If you are not familiar with the features, quickly browse [official PHP documentation about features](http://php.net/manual/en/language.oop5.traits.php).

`@Entity(tableClass="@my_table")` notes, Model links to database table `gc_my_table` (`@` automatically replaced with your installation's database prefix)

Annotations only, multiline interpretation works only if you start with two asterisks, not one asterisk.

```
// will NOT work:
/* @Column */

// will work:
/** @Column */

// will work:
/**
 * @Column
 */
```

When defining a property in a class, this variable, you can link a table column by placing the annotation `/** @Column(type="string") */` directly above the property definition. You can use any type supported by [Doctrine DBAL](http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/types.html).

The class that you refer to in your Model class must also exist in the database.

## Relation

The application data that you represent in your database model has certain relation between instances. A blog post has several comments about itself and belongs exactly to an example of a user. GreenCheap ORM, it provides mechanisms to identify these relationships and also to question them programmatically.

### Belongs-to relation

Basic description used in different relationship types, A `@BelongsTo` note on a model property. In the following example (taken from the blog's `Post` model), We specify a `$user` property defined to point to an instance of the GreenCheap `User` model.

The `keyFrom` parameter specifies which resource property to use to point to the user ID. Note how we must define the `user_id` property for the relation to be resolved by a query.

For Example:

```
/** @Column(type="integer") */
public $user_id;

/**
 * @BelongsTo(targetEntity="GreenCheap\User\Model\User", keyFrom="user_id")
 */
public $user;
```

### One-to-many relation

In this relation, an arbitrary example of a single model is
the number of instances of another model. A classic example of this is a `Post`.
any number of `Comment` instances. 
On the reverse side, the comment belongs in exactly one `Post`.

`GreenCheap\Blog\Model\Post` example from the blog package inside.

```
/**
 * @HasMany(targetEntity="Comment", keyFrom="id", keyTo="post_id")
 */
public $comments;
```

Define the inverse of the relation
`GreenCheap\Blog\Model\Comment`:

```
/** @Column(type="integer") */
public $post_id;

/** @BelongsTo(targetEntity="Post", keyFrom="post_id") */
public $post;
```

You can use the ORM class to query the model.

```
use GreenCheap\Blog\Post;

// ...

// fetch posts without related comments
$posts = Post::findAll();
var_dump($posts);
```

Output:

```
array (size=6)
  1 =>
    object(GreenCheap\Blog\Model\Post)[4513]
      public 'id' => int 1
      public 'title' => string 'Hello GreenCheap' (length=13)
      public 'comments' => null
      // ...

  2 =>
    object(GreenCheap\Blog\Model\Post)[3893]
      public 'id' => int 2
      public 'title' => string 'Hello World' (length=11)
      public 'comments' => null
      // ...

  // ...
```

```
use GreenCheap\Blog\Post;

// ...

// fetch posts including related comments
$posts = Post::query()->related('comments')->get();
var_dump($posts);
```

Output:

```
array (size=6)

  1 =>
    object(GreenCheap\Blog\Model\Post)[4512]
      public 'id' => int 1
      public 'title' => string 'Hello GreenCheap' (length=13)
      public 'comments' =>
        array (size=0)
          empty
      // ...

  2 =>
    object(GreenCheap\Blog\Model\Post)[3433]
      public 'id' => int 2
      public 'title' => string 'Hello World' (length=11)
      public 'comments' =>
        array (size=1)
          6 =>
            object(GreenCheap\Blog\Model\Comment)[4509]
              ...
      // ...

  // ...
```

### One-to-one relation

A very simple relation is a one-to-one relation. A `Forumuser` can be assigned exactly an `Avatar`. When including All information about the Avatar in the `ForumUser` model, sometimes it makes sense to separate them into separate models.

To implement a one-to-one relation, you can use the `@BelongsTo` annotation in each model class.

`/** @BelongsTo(targetEntity="Avatar", keyFrom="avatar_id", keyTo="id") */`

- `targetEntity`: Target model class
- `keyFrom`: foreign key pointing to the corresponding model in this table
- `keyTo`: primary key in the corresponding model

Example model `ForumUser`:

```php
<?php

namespace GreenCheap\Forum\Model;

use GreenCheap\Database\ORM\ModelTrait;

/**
 * @Entity(tableClass="@forum_user")
 */
class ForumUser
{

    use ModelTrait;

    /** @Column(type="integer") @Id */
    public $id;

    /** @Column */
    public $name = '';

    /** @Column(type="integer") */
    public $avatar_id;

    /** @BelongsTo(targetEntity="Avatar", keyFrom="avatar_id", keyTo="id") */
    public $avatar;

}
```

Example model `Avatar`:

```php
<?php

namespace GreenCheap\Forum\Model;

use GreenCheap\Database\ORM\ModelTrait;

/**
 * @Entity(tableClass="@forum_avatars")
 */
class Avatar
{

    use ModelTrait;

    /** @Column(type="integer") @Id */
    public $id;

    /** @Column(type="string") */
    public $path;

    /** @Column(type="integer") */
    public $user_id;

    /** @BelongsTo(targetEntity="ForumUser", keyFrom="user_id", keyTo="id") */
    public $user;

}
```

To ensure that the relevant model is included in a query result, fetch the instance `QueryBuilder` from the model class and explicitly list the relationship property in the `related()` method.

```php
<?php
use GreenCheap\Forum\Model\ForumUser;
use GreenCheap\Forum\Model\Avatar;
// ...

// get all users including their related $avatar object
$users = ForumUser::query()->related('avatar')->get();
foreach ($users as $user) {
    var_dump($user->avatar->path);
}

// get all avatars including their related $user object
$avatars = Avatar::query()->related('user')->get();
foreach ($avatars as $avatar) {
    var_dump($avatar->user);
}
```


### Many-to-many relation

Sometimes, two model, in a relationship where there are potentially * a large number of examples * on both sides of the relation. A example, there may be a relationship between tags and posts: There may be several tags assigned to a post. In the same time, a label can be assigned to multiple posts.

A different example listed below, scenario of favorite topics in a discussion forum. A user can have multiple favorite topics. A topic can be added to favorites by multiple users.

To apply the multiple relation, you need an additional database table. Each entry in this table, represents a link from a `Topic` instance to a `ForumUser` instance and vice versa. In database modeling, this is called a [junction table](https://en.wikipedia.org/wiki/Associative_entity).

Sample tables (so `script.php` inside):
```
$util = $app['db']->getUtility();

// forum user table
if ($util->tableExists('@forum_users') === false) {
    $util->createTable('@forum_users', function ($table) {
        $table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
        $table->addColumn('name', 'string', ['length' => 255, 'default' => '']);
        $table->setPrimaryKey(['id']);
    });
}

// topics table
if ($util->tableExists('@forum_topics') === false) {
    $util->createTable('@forum_topics', function ($table) {
        $table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
        $table->addColumn('title', 'string', ['length' => 255, 'default' => '']);
        $table->addColumn('content', 'text');
        $table->setPrimaryKey(['id']);
    });
}

// junction table
if ($util->tableExists('@forum_favorites') === false) {
    $util->createTable('@forum_favorites', function ($table) {
        $table->addColumn('id', 'integer', ['unsigned' => true, 'length' => 10, 'autoincrement' => true]);
        $table->addColumn('user_id', 'integer', ['unsigned' => true, 'length' => 10, 'default' => 0]);
        $table->addColumn('topic_id', 'integer', ['unsigned' => true, 'length' => 10, 'default' => 0]);
        $table->setPrimaryKey(['id']);
    });
}
```

The relation itself is then defined in each Model class that you want to query. If you only want to list favorite posts for a specific user, but if you don't list all users who have added a particular post to their favorites, you define a relationship only in a model. But in the following example, he `@ManyToMany` annotation is available in both model classes.

The` @ManyToMany ' annotation takes the following parameters.

Argument         | Description
---------------- | -----------
`targetEntity` | Target model class
`tableThrough` | Name of the junction table
`keyThroughFrom` | The name of the foreign key in the" From who" direction
`keyThroughTo` | The name of the foreign key in the" to who" direction
`orderBy` | (isteğe bağlı) Ekstreye göre sırala

Sample annotation:

```php
/**
 * @ManyToMany(targetEntity="ForumUser", tableThrough="@forum_favorites", keyThroughFrom="topic_id", keyThroughTo="forum_user_id")
 */
public $users;
```

Sample model `Topic`:

```php
<?php

namespace GreenCheap\Forum\Model;

use GreenCheap\Database\ORM\ModelTrait;

/**
 * @Entity(tableClass="@forum_topics")
 */
class Topic
{

    use ModelTrait;

    /** @Column(type="integer") @Id */
    public $id;

    /** @Column */
    public $title = '';

    /** @Column(type="text") */
    public $content = '';

    /**
     * @ManyToMany(targetEntity="ForumUser", tableThrough="@forum_favorites", keyThroughFrom="topic_id", keyThroughTo="forum_user_id")
     */
    public $users;

}
```

Sample model `ForumUser`:

```php
<?php

namespace GreenCheap\Forum\Model;

use GreenCheap\Database\ORM\ModelTrait;

/**
 * @Entity(tableClass="@forum_user")
 */
class ForumUser
{

    use ModelTrait;

    /** @Column(type="integer") @Id */
    public $id;

    /** @Column */
    public $name = '';

    /**
     * @ManyToMany(targetEntity="Topic", tableThrough="@forum_favorites", keyThroughFrom="forum_user_id", keyThroughTo="topic_id")
     */
    public $topics;

}
```

Sample queries:

```php
// resolve many-to-many relation in query

// fetch favorite ropics for given user
$user_id = 1;
$user = ForumUser::query()->where('id = ?', [$user_id])->related('topics')->first();

foreach ($user->topics as $topic) {
    //
}

// fetch users that have favorited a given topic
$topic_id = 1;
$topic = Topic::query()->where('id = ?', [$topic_id])->related('users')->first();

foreach ($topic->users as $user) {
    // ...
}
```

## ORM Queries

Fetch an instance of a model with a specific ID.

```
$post = Post::find(23)
```

Fetch all instances of a model.

```
$posts = Post::findAll();
```

Relations with the above queries, it will not be expanded to include relevant examples. In the above example, The `$comments` property of the `Post` instance will not be initialized.

```
// related objects are not fetched by default
$post->comments == null;
```

The reason for this is performance. By default, required subqueries are not performed, this saves execution time. So, if you need related objects, you can use the `related()` method on `QueryBuilder` to explicitly specify which relation to resolve in this query.

Therefore, to retrieve a `Post` instance and include Associated `Comment` instances, you must create a query that fetches related objects.
```
// fetch all, including related objects
$posts = Post::query()->related('comments')->get();

// fetch single instance, include related objects
$id = 23;
$post = Post::query()->related('comments')->where('id = ?', [$id])->first();
```

Note how `find(23)` is replaced with `-> where('id = ?',[$id])->first()`. the reason for this, `find()` is a method defined on the Model. But in the second example, we have a `GreenCheap\Database\Orm\QueryBuilder` instance.

For more details about Orm queries and regular queries, see the documentation for [database queries](database.md#queries)

## Create a new model instance

You can create and save a new model by calling the `save()` method on a new model instance.

```php
$user = new ForumUser();
$user->name = "bruce";
$user->save();
```

Alternatively, you can call the `create()` method directly in the model class and provide a set of existing data to start the instance. Call `save()` later to store the instance in the database.

```php
$user = ForumUser::create(["name" => "peter"]);
$user->save();
```

## Replace the existing instance

Bring an existing sample, make any changes to the object and then call the `save()` method to store the changes in the database.

```php
$user = ForumUser::find(2);
$user->name = "david";
$user->save();
```

## Delete existing instance

Take an existing model instance and call the `delete()` method to remove it from the database.

```php
$user = ForumUser::find(2);
$user->delete();
```
