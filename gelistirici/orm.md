<p class = "uk-article-lead"> GreenCheap Nesne-ilişkisel eşleyici (ORM), her bir özelliğin uygun tablo sütununa otomatik olarak eşlendiği uygulama verilerinizin model sınıflarını oluşturmanıza yardımcı olur. Varlıklarınız ve mevcut varlıklar arasındaki ilişkileri de GreenCheap'ten (yani kullanıcılar) tanımlayabilirsiniz </p>

## Kurmak

### Tablo oluşturun

Aşağıdakini, yani uzantınızın `scripts.php` dosyasının `install` kancasında çalıştırın. Tablo oluşturma hakkında daha genel bilgi için [veritabanı bölümü'ne](database.md) bakın.

Örnek:

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

### Model sınıfı tanımlayın

Örnek:

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

Model, `GreenCheap\Database\ORM\ModelTrait` özelliğini kullanan düz bir PHP sınıfıdır. Özellikler, basit sınıf kalıtımına benzer şekilde, belirli davranışları bir sınıfa dahil etmeye izin verir. Temel fark, bir sınıfın birden çok özelliği kullanabilmesi ve yalnızca tek bir sınıftan miras alabilmesidir.

**Not** Özelliklere aşina değilseniz, [özelliklerle ilgili resmi PHP belgelerine](http://php.net/manual/en/language.oop5.traits.php) hızlıca göz atın.

`@Entity(tableClass="@my_table")` notu, Modeli `gc_my_table` veritabanı tablosuna bağlar (`@`otomatik olarak kurulumunuzun veritabanı öneki ile değiştirilir)

Ek açıklamalar yalnızca, çok satırlı yorumu yalnızca bir yıldızla değil, iki yıldız işaretiyle başlatırsanız çalışır.

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

Bir sınıfta bir özelliği tanımlarken, bu değişkeni, özellik tanımının hemen üstüne `/** @Column(type="string") */` ek açıklamasını koyarak bir tablo sütununa bağlayabilirsiniz. [Doctrine DBAL](http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/types.html) tarafından desteklenen herhangi bir türü kullanabilirsiniz.

Model sınıfınızda başvurduğunuz sınıfın da veritabanında bulunması gerekir.

## İlişkiler

Veritabanı modelinizde temsil ettiğiniz uygulama verilerinin örnekleri arasında belirli ilişkileri vardır. Bir blog gönderisinin kendisiyle ilgili birkaç yorumu vardır ve tam olarak bir Kullanıcı örneğine aittir. GreenCheap ORM, bu ilişkileri tanımlamak ve ayrıca bunları programlı bir şekilde sorgulamak için mekanizmalar sunar.

### Belongs-to relation

Farklı ilişki türlerinde kullanılan temel açıklama, bir model özelliğinin üzerindeki `@BelongsTo` notudur. Aşağıdaki örnekte (Blog'un `Post` modelinden alınmıştır), GreenCheap `User` modelinin örneğini işaret edecek şekilde tanımlanan bir `$user` özelliğini belirtiyoruz.

"`keyFrom` parametresi, kullanıcı kimliğini işaret etmek için hangi kaynak özelliğinin kullanılacağını belirtir. İlişkinin bir sorgu tarafından çözülmesi için `user_id` özelliğini nasıl tanımlamamız gerektiğine dikkat edin.

Misal:

```
/** @Column(type="integer") */
public $user_id;

/**
 * @BelongsTo(targetEntity="GreenCheap\User\Model\User", keyFrom="user_id")
 */
public $user;
```

### One-to-many relation

Bu ilişkide, tek bir model örneğinin keyfi bir
başka bir modelin örnek sayısı. Bunun klasik bir örneği bir `Post` dur.
kendisine ait herhangi bir sayıda `Comment` örneği bulunan. Tersi
taraf, yorum tam olarak bir `Post` aittir.

`GreenCheap\Blog\Model\Post` içindeki blog paketinden örnek.

```
/**
 * @HasMany(targetEntity="Comment", keyFrom="id", keyTo="post_id")
 */
public $comments;
```

İlişkinin tersini tanımlayın
`GreenCheap\Blog\Model\Comment`:

```
/** @Column(type="integer") */
public $post_id;

/** @BelongsTo(targetEntity="Post", keyFrom="post_id") */
public $post;
```

Modeli sorgulamak için ORM sınıfını kullanabilirsiniz.

```
use GreenCheap\Blog\Post;

// ...

// fetch posts without related comments
$posts = Post::findAll();
var_dump($posts);
```

Çıktı:

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

Çıktı:

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

Çok basit bir ilişki, bire bir ilişkidir. Bir `ForumUser`a tam olarak bir `Avatar` atanmış olabilir. Avatar hakkındaki tüm bilgileri `ForumUser` modeline dahil ederken, bazen bunları ayrı modellere ayırmak mantıklıdır.

Bire bir ilişkiyi uygulamak için, her model sınıfında `@BelongsTo` ek açıklamasını kullanabilirsiniz.

`/** @BelongsTo(targetEntity="Avatar", keyFrom="avatar_id", keyTo="id") */`

- `targetEntity`: Hedef model sınıfı
- `keyFrom`: bu tablodaki ilgili modele işaret eden yabancı anahtar
- `keyTo`: ilgili modeldeki birincil anahtar

Örnek model `ForumUser`:

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

Örnek model `Avatar`:

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

İlgili modelin bir sorgu sonucuna dahil edildiğinden emin olmak için, model sınıfından "`QueryBuilder` örneğini getirin ve `related()` yönteminde ilişki özelliğini açıkça listeleyin.

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

Bazen, iki model, ilişkinin her iki tarafında potansiyel olarak * çok sayıda örneklerin * olduğu bir ilişki içindedir. Bir örnek, etiketler ve gönderiler arasındaki bir ilişki olabilir: Bir gönderiye atanmış birkaç etiket olabilir. Aynı zamanda, bir etiket birden fazla gönderiye atanabilir.

Aşağıda listelenen farklı bir örnek, bir tartışma forumundaki favori konuların senaryosudur. Bir kullanıcının birden çok favori konusu olabilir. Bir konu birden çok kullanıcı tarafından favorilere eklenebilir.

Çoktan çoğa ilişkisini uygulamak için ek bir veritabanı tablosuna ihtiyacınız vardır. Bu tablodaki her giriş, bir `Topic` örneğinden `ForumUser` örneğine ve bunun tersi bir bağlantıyı temsil eder. Veritabanı modellemesinde buna [bağlantı tablosu](https://en.wikipedia.org/wiki/Associative_entity) adı verilir.

Örnek tablolar (yani `scripts.php` içinde):
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

İlişkinin kendisi daha sonra sorgulayabilmek istediğiniz her Model sınıfında tanımlanır. Yalnızca belirli bir kullanıcı için sık kullanılan gönderileri listelemek istiyorsanız, ancak belirli bir gönderiyi favorilerine ekleyen tüm kullanıcıları listelemiyorsanız, ilişkiyi yalnızca bir modelde tanımlarsınız. Ancak aşağıdaki örnekte, `@ManyToMany` ek açıklaması her iki model sınıfında da bulunur.

`@ManyToMany` ek açıklaması aşağıdaki parametreleri alır.

Argüman          | Açıklama
---------------- | -----------
`targetEntity` | Hedef model sınıfı
`tableThrough` | Bağlantı tablosunun adı
`keyThroughFrom` | "Kimden" yönündeki yabancı anahtarın adı
`keyThroughTo` | "Kime" yönündeki yabancı anahtarın adı
`orderBy` | (isteğe bağlı) Ekstreye göre sırala

Örnek ek açıklama:

```php
/**
 * @ManyToMany(targetEntity="ForumUser", tableThrough="@forum_favorites", keyThroughFrom="topic_id", keyThroughTo="forum_user_id")
 */
public $users;
```

Örnek model "`Topic`:

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

Örnek model `ForumUser`:

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

Örnek sorgular:

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

## ORM Sorguları

Belirli bir kimliğe sahip bir model örneğini getir.

```
$post = Post::find(23)
```

Bir modelin tüm örneklerini getir.

```
$posts = Post::findAll();
```

Yukarıdaki sorgularla ilişkiler, ilgili örnekleri içerecek şekilde genişletilmeyecektir. Yukarıdaki örnekte, `Post` örneğinin `$comments` özelliği başlatılmayacaktır.

```
// related objects are not fetched by default
$post->comments == null;
```

Bunun nedeni performanstır. Varsayılan olarak, gerekli alt sorgular gerçekleştirilmez, bu da yürütme süresinden tasarruf sağlar. Dolayısıyla, ilgili nesnelere ihtiyacınız varsa, bu sorguda hangi ilişkilerin çözüleceğini açıkça belirtmek için `QueryBuilder` üzerindeki `related()` yöntemini kullanabilirsiniz.

Bu nedenle, bir `Post` örneğini almak ve ilişkili `Comment` örneklerini dahil etmek için, ilgili nesneleri getiren bir sorgu oluşturmanız gerekir.
```
// fetch all, including related objects
$posts = Post::query()->related('comments')->get();

// fetch single instance, include related objects
$id = 23;
$post = Post::query()->related('comments')->where('id = ?', [$id])->first();
```

`find(23)` ün nasıl `->where('id = ?', [$id])->first()` ile değiştirildiğine dikkat edin. Bunun nedeni, `find()` ın Model üzerinde tanımlanmış bir yöntem olmasıdır. Ancak ikinci örnekte, bir `GreenCheap\Database\ORM\QueryBuilder` örneğine sahibiz.

ORM sorguları ve düzenli sorgular hakkında daha fazla ayrıntı için, [veritabanı sorguları](database.md#queries) ile ilgili belgelere bakın

## Yeni model örneği oluşturun

Yeni bir model örneğinde `save()` yöntemini çağırarak yeni bir model oluşturabilir ve kaydedebilirsiniz.

```php
$user = new ForumUser();
$user->name = "bruce";
$user->save();
```

Alternatif olarak, doğrudan model sınıfında `create()` yöntemini çağırabilir ve örneği başlatmak için bir dizi mevcut veri sağlayabilirsiniz. Örneği veritabanında saklamak için daha sonra `save()`i çağırın.

```php
$user = ForumUser::create(["name" => "peter"]);
$user->save();
```

## Mevcut örneği değiştirin

Mevcut bir örneği getirin, nesnede herhangi bir değişiklik yapın ve ardından değişiklikleri veritabanında depolamak için `save()` yöntemini çağırın.

```php
$user = ForumUser::find(2);
$user->name = "david";
$user->save();
```

## Mevcut örneği silin

Mevcut bir model örneğini alın ve bu örneği veritabanından kaldırmak için `delete()`yöntemini çağırın.

```php
$user = ForumUser::find(2);
$user->delete();
```
