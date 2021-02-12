# Veritabanı

<p class = "uk-article-lead"> Bu bölüm, veritabanı bağlantısını yapılandırma, tablo oluşturma, uzantılardan veritabanı komut dosyalarını çalıştırma ve veritabanı sorgularını manuel olarak oluşturmanın temellerinden bahsedilmektedir. </p>

**Not** Uygulama verilerinizi veritabanı tablolarıyla rahat bir şekilde eşlemek için önerilen yol, kendi bölümünde açıklanan GreenCheap Object-relational mapper (ORM) yöntemidir.


## Yapılandırma
Veritabanı kimlik bilgileri `config.php` de saklanır. GreenCheap `mysql`, `sqlite` ve `postgresql` i destekler.

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

## Veritabanı ön ekleriyle çalışma

Tüm tablo adları, GreenCheap kurulumunuzun ön ekini içerir. Arka uçtaki tabloları dinamik olarak adreslemek için ön ek için yer tutucu olarak `@` simgeli tablo adını kullanın. Bir kural olarak, tablo adını uzantı adınızla başlatmalısınız, örn. `foobar` uzantısı için _options_ tablosu: `@foobar_option`

## Veritabanı yardımcı programı

Veritabanı hizmet yardımcı programını kullanarak veritabanı şemanızı yönetebilirsiniz (aşağıdaki örneklere bakın).

```
$util = $this['db']->getUtility();
```

## Tablo olup olmadığını kontrol edin

```
if ($util->tablesExist(['@table1', '@table2'])) {
  // tables exists
}
```

## Tablo oluştur

Bir tablo oluşturmak için `Utility :: createTable ($ table, \ Closure $ callback)` kullanın, geri aramaya iletilen ilk parametre bir `Doctrine \ DBAL \ Schema \ Table` örneği olacaktır.

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

`$table` nesnesi bir `\Doctrine\DBAL\Schema\Table` örneğidir. [class reference](http://www.doctrine-project.org/api/dbal/2.5/class-Doctrine.DBAL.Schema.Table.html) resmi Doktrin belgelerinde bulabilirsiniz.


`addColumn` kullanarak bir sütun oluştururken, mevcut [data types](http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/types.html) bakmak isteyebilirsiniz. ve ayrıca Doctrine belgelerinde bulunan [column options](http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/schema-representation.html#portable-options).

Bir tablo oluşturmak genellikle uzantınızın içindeki `scripts.php` nin `install` kancasında yapılır. Sonraki bölümde [Migrations](#migrations) hakkında daha fazla bilgi edinin.


## Geçişler

Veritabanı geçişleri, uzantınızdaki `scripts.php` nin `'updates'` bölümünde tanımlanır. Merhaba uzantısında [scripts.php](https://github.com/greencheap/extension-hello/blob/master/scripts.php) için tam bir örnek bulunabilir. Aslında yürütülmesi için bu dosyayı `composer.json` dan bağlamayı unutmayın:

```
    "extra": {
       "scripts": "scripts.php"
    },
```

`scripts.php` içinde, uzantı yaşam döngüsünün farklı olaylarına bağlanabilirsiniz.

| Olay kancası      | Açıklama       |
| ----------- | -------------- |

| `install` | Uzantı yüklendiğinde çağrılır. Genellikle tablolarınızı burada oluşturursunuz.
| `enable` | Yönetici alanında uzantı etkinleştirildiğinde çağrılır.
| `uninstall` | Uzantı kaldırıldığında çağrılır. Bu, oluşturduğunuz her şeyi toparlayacağınız, yani uzantınızın tüm tablolarını bırakacağınız yerdir.
| `enable` | Uzantınız güncellendiğinde herhangi bir kodu çalıştırın. Her anahtarın bu kodun çalıştırılması gereken sürüm numarası olduğu bir dizi bekler. Örnek:

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

### Mevcut bir tabloyu değiştirin

Mevcut bir tabloyu değiştirmek için, temel Doctrine DBAL'ın mevcut araçlarını kullanın. Mevcut bir tabloya sütun eklemek için, aşağıdaki parçacıkları uzantınızın `scripts.php` dosyasının `updates` sürüm kancalarından birine dahil edebilirsiniz.

```
use Doctrine\DBAL\Schema\Comparator;

// ...

$util = $app['db']->getUtility();
$manager = $util->getSchemaManager();

if($util->tableExists('@system_comments')) {
	$fromTable =  $util->listTableDetails('@system_comments');
	if (!$fromTable->hasColumn('data')) {
		$toTable = clone $fromTable;
		$toTable->addColumn('data', 'json_array' , ['notnull' => false]);
		$comparator = new Comparator;
		$manager->alterTable($comparator->diffTable($fromTable, $toTable));
	}
}

```


`$table` nesnesi bir `\Doctrine\DBAL\Schema\Table` örneğidir. [class reference](http://www.doctrine-project.org/api/dbal/2.5/class-Doctrine.DBAL.Schema.Table.html) resmi Doktrin belgelerinde bulabilirsiniz.


## Sorguları

Veritabanına erişmenin birkaç yolu vardır. GreenCheap, altında yatan MySQL veya SQLite üzerinde bir özetleme sunar, bu nedenle PDO veya benzeri mekanizmaları kullanmaya gerek yoktur.


### 1. Sorgu oluşturucu

[QueryBuilder](https://github.com/greencheap/greencheap/blob/develop/app/modules/database/src/Query/QueryBuilder.php), sorgu oluşturmanın daha rahat bir yolunu sağlar.

Örnek:

```
$result = Application::db()->createQueryBuilder()->select('*')->from('@blog_post')->where('id = :id', ['id' => 1])->execute()->fetchAll();
```


#### Sorgu oluşturucu nesnesi alın

```
use GreenCheap\Application;

// ...

$query = Application::db()->createQueryBuilder();
```

#### Temel seçimler ve koşullar

 
Yöntem   | Açıklama
-------- | -----------
`select($columns = ['*'])` | Sorguya bir "seçim" oluşturur ve ekler.
`from($table)` | Sorguya bir "kimden" oluşturur ve ayarlar.
`nerede ($ koşul, dizi $ parametreler = [])` | Sorguya bir "nerede" oluşturur ve ekler.
`orWhere ($ koşul, dizi $ parametreler = [])` | Sorguya bir "veya nerede" oluşturur ve ekler.

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

#### Sorgu yürütme

Yöntem          | Açıklama
--------        | -----------
`get ($ sütunlar = ['*'])` | Sorguyu yürütün ve tüm sonuçları alın.
`ilk ($ sütunlar = ['*'])` | Sorguyu yürütün ve ilk sonucu alın.
`say ($ sütun = '*')` | Sorguyu yürütün ve "sayım" sonucunu alın.
`çalıştır ($ sütunlar = ['*'])` | "Seç" sorgusunu yürütün.
`güncelle (dizi $ değerler)` | Verilen değerlerle "güncelleme" sorgusunu yürütün.
`sil ()` | "Sil" sorgusunu yürütün.


#### Toplama işlevleri


Yöntem         | Açıklama
-------------- | -----------
`min($column)` | Sorguyu yürütün ve "min" sonucunu alın.
`max($column)` | Sorguyu yürütün ve "maksimum" sonucu alın.
`sum($column)` | Sorguyu yürütün ve "toplam" sonucunu alın.
`avg($column)` | Sorguyu yürütün ve "avg" sonucunu alın.

Örnek:

```
// create query
$query = $query = Application::db()->createQueryBuilder();

// determine total number of blog comments
$count = $query
    ->select(['comment_count'])
    ->from('@blog_post')
    ->sum('comment_count');
```

#### Gelişmiş sorgu yöntemleri



Yöntem   | Açıklama
-------- | -----------
`whereIn($column, $values, $not = false, $type = null)` | Sorguya "nerede" oluşturur ve ekler.
`orWhereIn($column, $values, $not = false)` | Sorguya bir "veya nerede" oluşturur ve ekler.
`whereExists($callback, $not = false, $type = null)` | Sorguya "bulunduğu yerde" oluşturur ve ekler.
`orWhereExists(Closure $callback, $not = false)`| Sorguya bir "veya var olduğu yerde" oluşturur ve ekler.
`whereInSet($column, $values, $not = false, $type = null)`| Sorguya eşdeğer bir "where FIND_IN_SET" oluşturur ve ekler.
`groupBy($groupBy)` | Sorguya bir "gruplama ölçütü" oluşturur ve ekler.
`having($having, $type = null)` | Sorguya bir "sahip olma" oluşturur ve ekler.
`orHaving($having)` | Sorguya bir "veya sahip" oluşturur ve ekler.
`orderBy($sort, $order = null)` | Sorguya bir "sıralama" oluşturur ve ekler.
`offset($offset)`| Sorgunun uzaklığını ayarlar; bu, sonuçların ilk sonuçla değil, sonuç tamsayı endeksi `$offset` tarafından tanımlanan sonuçla başlayacağı anlamına gelir. Bu, sayfalama için kullanışlıdır.
`limit($limit)` | Sorgunun sınırını belirler. `$limit`, döndürülecek maksimum sonuç sayısını tanımlar.
`getSQL()` | SQL sorgusunu alır.


#### Katılıyor

Yöntem   | Açıklama
-------- | -----------
`join($table, $condition = null, $type = 'inner')` | Sorguya bir "birleştirme" oluşturur ve ekler.
`innerJoin($table, $condition = null)`| Sorguya bir "iç birleştirme" oluşturur ve ekler.
`leftJoin($table, $condition = null)` | leftJoin ($ tablo, $ koşul = null)
`rightJoin($table, $condition = null)` | Sorguya bir "doğru birleştirme" oluşturur ve ekler.


### 2. ORM Sorguları


Uzantınızda [ORM](orm.md) kurduğunuzda, model sınıfınızı kullanarak çok okunabilir sorgular oluşturabilirsiniz.

Örnek:

```
$result = Role::where(['id <> ?'], [Role::ROLE_ANONYMOUS])->orderBy('priority')->get();
```

Aşağıdaki yöntemler mevcuttur. ([ModelTrait](https://github.com/greencheap/greencheap/blob/develop/app/modules/database/src/ORM/ModelTrait.php) içinde tanımlanmıştır).

Yöntem   | Açıklama
-------- | -----------
`create($data = [])` | Veri dizisinde geçirilen bu modelin yeni bir örneğini oluşturur.
`where($condition, array $params = [])` | Bir nerede koşulu belirtin. Koşuldaki soru işaretleri, ilettiğiniz parametrelerle değiştirilir. Bir "`QueryBuilder` nesnesi döndürür, böylece daha spesifik sorgular için yöntem çağrılarını zincirleyebilirsiniz. Örnek: `User::where(['name = ?'], ['peter'])`
`find($id)` | Tanımlayıcısına göre bir model varlığını alır.
`findAll()`| Bu modelin tüm varlıklarını alır.
`save(array $data = [])` | Model varlığını kaydeder.
`delete()` | Model varlığını siler.
`toArray(array $data = [], array $ignore = [])` | Model verilerini bir dizi olarak döndürür. `$data` parametresi olarak dahil edilecek özellik anahtarlarının bir listesini iletin. `$ignore` parametresi olarak hariç tutulacak özellik anahtarlarının bir listesini iletin.
`query()` | Bu sınıftan herhangi bir yöntemi kullanmak için bir `ORM\QueryBuilder` örneği döndürür. Bu örnek, normal sorgu oluşturucudaki tüm yöntemleri ve ayrıca özellikle ORM için bazı ekleri sunar.


#### ORM Sorgu Oluşturucu: Ek yöntemler

Yöntem   | Açıklama
-------- | -----------
`get()` | Sorguyu yürütür ve tüm sonuçları alır.
`first()` | Sorguyu yürütür ve ilk sonucu alır.
`related($related)` | Hevesli yüklenecek ilişkileri ayarlayın.
`getRelations()` | Sorgunun tüm ilişkilerini alır.
`getNestedRelations($relation)`  | Sorgunun tüm iç içe geçmiş ilişkilerini alır.

Örnek:

```
$comments = Comment::query()->related(['post' => function ($query) {
    return $query->related('comments');
}])->get();
```

### 3. Ham sorgular

Veritabanını sorgulamanın en basit yolu, veritabanına ham sorgular göndermektir. Bu temelde sadece PDO'nun etrafındaki bir sarmalayıcıdır.

```
$result = Application::db()->executeQuery('select * from @blog_post')->fetchAll();
$result = Application::db()->executeQuery('select * from @blog_post WHERE id = :id', ['id' => 1])->fetchAll();
```

## Ekle

Veritabanına veri eklemek, `Application::db()` aracılığıyla alabileceğiniz veritabanı bağlantı örneği kullanılarak yapılabilir (dosyanızın üst kısmındaki `use GreenCheap\Application;`.

`insert($tableExpression, array $data, array $types = array())`yöntemini kullanın.


Örnek:

```
Application::db()->insert('@system_page', [
    'title' => 'Home',
    'content' => "<p>Hello World</p>",
    'data' => '{"title":true}'
]);
```

[ORM](#ORM) kullanırken, sadece yeni bir model örneği oluşturmanız ve `save()` yöntemini çağırmanız gerekir.



## ORM

GreenCheap'teki Nesne ilişkisel eşleme (ORM) ile, bir Model sınıfını bir veritabanı tablosuna bağlayabilirsiniz. Bunun kurulumu QueryBuilder'dan birkaç satır daha alırken, ORM çok sayıda manuel işi sizin elinizden alır. ORM kullanmak, uygulama verilerinizi veritabanına nasıl depoladığınızı ve veritabanından nasıl aldığınızı yönetmenin önerilen yoludur. [GreenCheap ORM](orm.md) hakkında daha fazla bilgi edinin.
