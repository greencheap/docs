# Modüller

<p class="uk-article-lead">GreenCheap uygulama kodunu ayarlamak için *Modüller* kullanır. Modül tanımı, önyükleme, yönlendirme ve diğer yapılandırma seçenekleri sağlamak için kullanılır. Burada olayları dinleyebilir, özel sınıflar ve kendi denetleyicilerinizi ekleyebilirsiniz.</p>

## Tanım: index.php
Bir modülü yüklemek ve yapılandırmak için GreenCheap'te bir `ModuleManager` vardır. Modül dizininin kökünde bir `index.php` dosyası arayacak ve bir PHP dizisi döndürmesini bekleyecektir. Bu diziyi modüller kodu için önyükleme olarak düşünün.

Bu dizideki doğru özellikleri ayarlayarak, GreenCheap'e modülünüz hakkında bilmesi gereken her şeyi söylersiniz.

```php
<?php

/*
 * Modül tanımı olan bir php dizisi döndürür.
 */
return [

    // Gerekli: Benzersiz modül adı
    'name' => 'hello',

];
```

Bu minimal örnek, GreenCheap tarafından yüklenmek dışında hiçbir şey yapmasa da geçerli bir modül tanımıdır. Bir modül yalnızca içerdiği paket yönetici panelinde etkinleştirildiyse yüklenir.

**Not:** GreenCheap'in iç yapısını keşfetmeye başlarsanız, birçok yerde aynı modül yapısını göreceksiniz, GreenCheap mimarisinin merkezi bir konsepti.

## Kullanılabilir Mülkler

Aşağıdaki tabloda, modül tanım dizisinde kullanabileceğiniz tüm tuşlara genel bir bakış sunulmaktadır. Aşağıdaki bölümler özellikleri ayrıntılı olarak açıklar ve kod örneklerini içerir. *Ayrıntılar* bağlantılarından birini tıklayarak doğrudan her bölüme atlayabilirsiniz.

Anahtar       | Açıklama                       | Daha Fazlası
--------- | --------------------------------- | -----
`main`   | Modül yüklendiğinde yürütülen önyükleme kodu |
`autoload` | Otomatik yüklenecek ad alanlarını kaydedin |
`routes`    | Rota denetleyicileri |
`permissions`  | İzin adlarını tanımlama ve kaydetme |
`resources`  | Kaynak kısayollarını kaydetme |
`events`    | GreenCheap veya diğer modüllerden olayları dinleyin |
`config`    | Varsayılan modül yapılandırması |
`nodes`    | Site Ağacı için Düğümleri Kaydetme |
`node`    | Düğüm yapılandırması için varsayılan seçenekler |
`settings`    | Bir ayarlar ekranına bağlantı |
`menu` | Yönetici paneline menü öğeleri ekleme |
`widgets`    | Pencere Öğelerini Kaydet |
`widget`    | Widget yapılandırması için varsayılan seçenekler |

## Önyükleme kodu

Herhangi bir PHP kodunu çalıştırmak için `main` özelliğine bir geri çağırma işlevi atayabilirsiniz. İşlev, GreenCheap Application kapsayıcı örneğini parametre olarak alır.

```php
use GreenCheap\Application;

// ...

'main' => function (Application $app) {
    // Önyükleme kodu
}
```

Bu işlev, bu modül yüklendiğinde çağrılır, bu nedenle her normal sayfa isteğinde. Ancak, modülün `index.php` dosyasının geçerli bir pakette bulunması ve paketin yönetici panelinde etkinleştirilmesi gerekir. Bu, önyükleme kodunun yüklenmesi için bir uzantının kurulması ve etkinleştirilmesi gerektiği anlamına gelir. Bunu bir temanın içinde kullanırsanız, yalnızca o anda etkinleştirilmiş olan temanın önyükleme kodu yürütülür.

Geri arama işlevi atamak ve tüm kodlarınızı doğrudan `index.php` içinde bulundurmak yerine, ayrı bir dosyada özel bir modül sınıfı da oluşturabilirsiniz. Daha sonra modül sınıfınızın tam adını (ad alanı dahil) `main` özelliğinin değeri olarak belirtirsiniz.

```php
'main' => 'MyNamespace\\MyModule',
```

**Note** Çalışması için başvurulan ad alanının autoloaded olması gerekir. `MyModule` sınıfının `GreenCheap\Module\ModuleInterface` arabirimini uyguladığından emin olun. Kısaca bu not için **Özel ad alanlarını kaydetme** alanına bakabilirsiniz.

## Özel ad alanlarını kaydetme

GreenCheap tarafından otomatik yüklenecek ad alanlarının ve yolların bir listesini iletin. Yol modülün yoluna göredir, bu nedenle aşağıdaki örnekteki "src", modül paketinin `Packages/VENDOR/PACKAGE/index.php` konumunda olduğu varsayılarak `Packages/VENDOR/PACKAGE/src` konumunda bulunur.

```php
'autoload' => [

    'GreenCheap\\Hello\\' => 'src'

]
```

Bağlantılı dizindeki sınıflar daha sonra GreenCheap kod tabanındaki `use` deyimlerinde kullanılabilir.

```
<?php
use GreenCheap\Hello\HelloExtension;
```

## Rota denetleyicileri
Denetleyicileri bir rotaya monte etmek için `route` özelliğini kullanın. Yönlendirme ve Denetleyiciler hakkında daha fazla bilgi edinin.

```php
'routes' => [

    '/hello' => [
        'name' => '@hello/admin',
        'controller' => [
            'GreenCheap\\Hello\\Controller\\HelloController'
        ]
    ]

]
```

## İzinleri tanımlayın
Modülünüze izinler tanımlayabilir. Bunlar daha sonra Kullanıcı ve İzinler alanındaki rollere atanabilir.

The unique permission names you define (here `hello: manage settings`) are used as an identifier across the codebase. You can use this identifier to protect your routes from users who do not have this permission and prevent users from performing unauthorized actions.

Tanımladığınız benzersiz izin adları (burada `hello: manage settings`), kod tabanında bir tanımlayıcı olarak kullanılır. Bu tanımlayıcıyı, rotalarınızı bu izne sahip olmayan kullanıcılardan korumak ve kullanıcıların yetkisiz eylemler gerçekleştirmesini önlemek için kullanabilirsiniz.

```php
'permissions' => [

    'hello: manage settings' => [
        'title' => 'Manage settings'
    ]

]
```

Daha sonra bir denetleyici eylemini korumanın basit bir yolu aşağıdaki gibi bir ek açıklama kullanmaktır. Daha fazla bilgi için **ek açıklamalar** hakkında bilgi edinin.

```
<?php

class MyController {

	/**
  	* @Access("hello: manage settings")
  	*/
	public function settingsAction() {
    	// Kontrol Dosyanız
	}
}
```

## Kaynak kısayollarını kaydetme
Yollarla çalışırken daha kısa sürüm olarak kullanılacak önekleri kaydedebilirsiniz. Örneğin, `packages/VENDOR/PACKAGE/views/admin/settings.php`'ye başvurmak için `views:admin/settings.php`'yi kullanın. GreenCheap varsayılan olarak uzantılar ve temalar için birkaç yol kaydeder.

Bu, GreenCheap dosya sistemi her kullanıldığında (yani bir dosya yolu için URL oluştururken veya bir denetleyiciden bir görünüm oluştururken) çalışır.

```php
'resources' => [

    'views:' => 'views'

],
```

## Etkinlikleri dinleme
Olaylar GreenCheap çekirdeğinin birkaç noktasında ve potansiyel olarak diğer modüller tarafından tetiklenir. Bir etkinliğin her zaman onu tanımlayan benzersiz bir adı vardır. Geri arama işlevlerini herhangi bir etkinliğe kaydedebilirsiniz.

Etkinlik sistemi hakkında daha fazla bilgi için Etkinlikler bölümüne göz atın.

```php
'events' => [

    'view.scripts' => function ($event, $scripts) {
        $scripts->register('hello-settings', 'hello:app/bundle/settings.js', '~extensions');
    }

]
```

## Varsayılan modül yapılandırması
Çoğu durumda, örneğin bir ayarlar ekranı sağlayarak kullanıcının modülünüzün ayarlarını değiştirmesine izin vermek istersiniz. Modülünüzün en baştan her zaman bazı yapılandırma değerlerine sahip olduğundan emin olmak için varsayılan bir modül yapılandırması sağlayabilirsiniz.

```php
'config' => [
    'default' => 'World'
],
```

Bu yapılandırma dizisinde yapılan değişiklikler daha sonra veritabanı tarafından saklanır. Varsayılan değerler daha sonra her zaman veritabanındaki değerlerle birleştirilir ve birleştirme sonucu, sonraki iki bölümdeki örneklerde gördüğünüz gibi modül nesnesinin config özelliği olarak kullanılabilir.

### Yapılandırmayı oku
To read the config of a module, you can access the `config` property of the module instance. This object is the result of both the default config stored inside the `index.php` and changes that are stored in the database.

Bir modülün yapılandırmasını okumak için modül örneğinin `config` özelliğine erişebilirsiniz. Bu nesne, hem `index.php `'içinde depolanan varsayılan yapılandırmanın hem de veritabanında depolanan değişikliklerin sonucudur.

```php
$config = $app->module('hello')->config;
```

### Yapılandırma yaz
Bir modül yapılandırmasının değişikliklerini saklamak için `config()` hizmetini kullanın. Bu değişiklikler otomatik olarak veritabanına yayılacaktır.

```php
// Complete config
$app->config()->set('hello', $config);

// Single Value
$app->config('hello')->set('message', 'Custom message');
```

**Note**. Yapılandırmayı doğrudan modülden okursanız, yine de eski değere sahip olacaktır. Bir sonraki talepten sonra, GreenCheap değişiklikleri birleştirecek ve bunları `$module` örneğinin `config` özelliği olarak  hale getirmiş olacaktır.

## Site Ağacı için Düğümleri Kaydetme
Düğümler, Site Ağacı Görünümü'nde sürüklenebilecekleri ana fark içeren rotalara benzer ve bu nedenle dinamik olarak hesaplanmış bir rotaya neden olur.

Bir Düğüm eklediğinizde, Site Ağacı'nda kullanılabilir. Kullanılabilir tüm Düğüm türlerinin Açılır menüsünü görmek için _Sayfa Ekle_ düğmesini tıklayın.

Düğümler hakkında daha fazla bilgi için, Yönlendirme bölümüne bakın.

```php
'nodes' => [

    'hello' => [

        // Düğüm yolunun adı
        'name' => '@hello',

        // Yönetici panelinde görüntülenecek etiket
        'label' => 'Hello',

        // Bu düğüm için denetleyici. Her denetleyici eylemi monte edilecektir
        'controller' => 'GreenCheap\\Hello\\Controller\\SiteController'
    ]

]
```

## Düğüm seçenekleri

Modülünüz Site Ağacı'ndaki içerik düzenleyiciye bir yapılandırma ekranı eklemek istiyorsa, düğüm nesnesine varsayılan seçenekler eklemek için `düğüm` özelliğini kullanabilirsiniz (Tema eğitiminde yapılandırma ekranı için tam açıklama)

Aşağıdaki örnekte tema, oluşturulan her düğüm nesnesine otomatik olarak eklenen bir `top_style` özelliğini tanımlar. Varsayılan olarak, özellik bu örnekte `üst` konum için oluşturmak istediğimiz bir CSS sınıfı olan `uk-block-muted` değerine sahip olacaktır.

```php
'node' => [

    'top_style' => 'uk-block-muted'

],
```

Temanın `template.php` dosyasında bir sayfa oluştururken, bu özelliğe `$params` dizisinden erişebilirsiniz.

```php
<?php echo $params['top_style'] ?>
```

`node` özelliğiyle, her düğüm için varsayılan değeri ayarlarsınız. Kullanıcının bu değerleri değiştirmesine izin vermek için, yönetici alanına bir arayüz eklemek isteyeceksiniz (genellikle bir sayfanın içeriğini düzenlerken _Theme_ sekmesi şeklinde).

To allow the user to change the values of the default widget options that you have defined here, you can add an interface to the admin area. To achieve that, you define a JavaScript component to display the editing screen (Example), register that JavaScript file on the content editor page (Example) and optionally update your Webpack configuration, if you are using Webpack (Example). A complete explanation for this can be found in the Theme tutorial.

Kullanıcının burada tanımladığınız varsayılan widget seçeneklerinin değerlerini değiştirmesine izin vermek için, yönetici alanına bir arabirim ekleyebilirsiniz. Bunu başarmak için, düzenleme ekranını görüntülemek üzere bir JavaScript bileşeni tanımlar (Örnek), bu JavaScript dosyasını içerik düzenleyici sayfasına kaydedin ve Webpack kullanıyorsanız isteğe bağlı olarak Webpack yapılandırmanızı güncelleyin. Bunun için tam bir açıklama Tema eğitiminde bulabilirsiniz.

## Yönetici paneline menü öğeleri ekleme
Yönetici panelinin ana navigasyonuna menü öğeleri ekleyebilirsiniz. Bunlar herhangi bir kayıtlı rotaya bağlanabilir ve belirli erişim izinleriyle sınırlandırılabilir. `Access` özelliği menü öğesinin görünür olup olmadığını belirler.

```php
'menu' => [

        // isim, menü hiyerarşisi için kullanılabilir
        'hello' => [

            // Görüntülenecek etiket
            'label' => 'Hello',

            // Görüntülenecek simge
            'icon' => 'hello:icon.svg',

            // Bu menü öğesinin bağlantı verdiği URL
            'url' => '@hello/admin',

            // İsteğe bağlı: Geçerli url'de menü öğesinin etkin olup olmadığını kontrol etmek için ifade
            // 'active' => '@hello*'

            // İsteğe bağlı: Özel izni atanmış rollere erişimi sınırlayın
            // 'access' => 'hello: manage hellos'
        ],

        'hello: panel' => [

            // Üst menü öğesi, bunun 2. düzeyde görünmesini sağlar yani çocuk menü
            'parent' => 'hello',
            'label' => 'Hello',
            'icon' => 'hello:icon.svg',
            'url' => '@hello/admin'
            // 'access' => 'hello: manage hellos'
        ]

    ],
```

## Bir ayarlar ekranına bağlantı
Ayarlar ekranınızı görüntüleyen bir rotaya bağlantı oluşturun. Bu özelliği ayarlamak, GreenCheap'in yönetici paneli listesindeki temanızın veya uzantınızın yanında bir _Settings_ düğmesi oluşturmasını sağlar.

```php
'settings' => '@hello/admin/settings',
```

## Widget'ları kaydetme
A widget is also a module. With the `widgets` property you can register all widget module definition files. Each of those files is expected to return a PHP array in the form of a valid module definition. Learn more about widgets.

Widget da bir modüldür. `Widgets`'lar özelliği ile tüm widget modülü tanım dosyalarını kaydedebilirsiniz. Bu dosyaların her birinin geçerli bir modül tanımı biçiminde bir PHP dizisi döndürmesi beklenir. Widget'lar hakkında daha fazla bilgi edinin.

```php
'widgets' => [

    'widgets/form.php'

],
```

## Widget seçenekleri

Modülünüz, widget düzenleyicisine bir yapılandırma ekranı eklemek istiyorsa (bu genellikle bir tema geliştirirken görülür), widget nesnesine varsayılan seçenekler eklemek için `widget` özelliğini kullanabilirsiniz (widget yapılandırma ekranı için eksiksiz bir örnek) Tema eğitiminde).

Aşağıdaki örnekte tema, oluşturulan her widget nesnesine otomatik olarak eklenen bir `panel` özelliğini tanımlar. Varsayılan olarak, özellik değeri olarak boş dize içerir.

```php
'widget' => [

    'panel' => ''

],
```

Widget oluştururken, bu özelliğe `$widget->theme` dizisinden erişebilirsiniz.

```php
<?php echo $widget->theme['panel'] ?>
```

Kullanıcının buna izin vermek için, burada tanımladığınız varsayılan widget seçeneklerinin değerlerini değiştirmesi için, yönetici alanına bir arabirim ekleyebilirsiniz. Bunu başarmak için düzenleme ekranını görüntülemek üzere bir JavaScript bileşeni tanımlarsınız, bu JavaScript dosyasını widget düzenleyici sayfasına kaydedersiniz ve Webpack kullanıyorsanız isteğe bağlı olarak Webpack yapılandırmanızı güncellersiniz. Bunun için tam bir açıklama Tema eğitiminde bulunabilir.