<p class="uk-article-lead">GreenCheap tarafından çözülen merkezi bir görev _Routing_'dir. Tarayıcı bir URL'ye çarptığında, çerçeve, hangi işlemin çağrılacağını belirler.</p>

## Kontroller
GreenCheap'de rota oluşturmanın en yaygın yolu bir _controller_ tanımlamaktır. Bir denetleyici istekleri işlemekten, rotaları ayarlamaktan ve görünümleri oluşturmaktan sorumludur.

### Bir kontroller kaydedin
Modül yapılandırmanızın içine bir denetleyici kaydedebilirsiniz. Denetleyicileri bir rotaya monte etmek için `routes` özelliğini kullanın.

```php
'routes' => [

    '/hello' => [
        'name' => '@hello/admin',
        'controller' => [
            'GreenCheap\\Hello\\Controller\\HelloController'
        ]
    ]

],
```

### Basit yapı
Sınıf, `@Route("/hello")` ile açıklanır ve denetleyicinin `http://example.com/hello/` adresinde _mounted_ olmasına neden olur. Bu, söz konusu URL'ye ve `http//example.com/hello/settings` gibi alt URL'lere yapılan tüm isteklere yanıt vereceği anlamına gelir.

```php
namespace GreenCheap\Hello\Controller;

/**
 * @Route("/hello")
 */
class HelloController
{

    public function indexAction()
    {
        // ...
    }

    public function settingsAction()
    {
        // ...
    }
}
```

Varsayılan olarak, uzantınız (veya temanız) önyüklenir ve otomatik olarak bir dizi varsayılan rota oluşturulur. Yeni kayıtlı rotaları (tüm temel rotalarla birlikte) görüntülemek için geliştirici araç çubuğunu kullanabilirsiniz.

Rotayı nasıl anlayacağınız aşağıda açıklanmıştır:

Rota | Örnek | Açıklama
------|------------------|---------------------------------------------------
Name  |`@hello/hello/settings`| Rotanın adı URL'leri oluşturmak için kullanılabilir (benzersiz olması gerekir).
URI   |`/hello/settings`| Tarayıcıda bu rotaya erişmenin yolu.
Action|`GreenCheap\Hello\Controller\DefaultController::settingsAction`| Çağrılacak denetleyici eylemi.

Varsayılan olarak, yollar `http://example.com/<extension>/<controller>/<action>`biçiminde olacaktır. Özel bir eylem, `.../index`'e değil, `... /`'ye monte edilecek olan `indexAction` dır. Özel rotalara yönelik gelişmiş seçenekler, sonraki bölümlerde göreceğiniz gibi elbette mevcuttur.

**Not** Bir rota uygulamanızda benzersiz değilse, ilk olarak eklenmiş olan rota kullanılır. Bu değişebilecek çerçeve iç davranışı olduğundan, buna güvenmemeli, rotalarınızın benzersiz olduğundan emin olmalısınız.

## Açıklamalar (Annotations)
Denetleyicinin davranışlarının çoğu sınıfa eklenmiş bilgiler ve yöntemlerle belirlenir. Hızlı bir genel bakış, her ek açıklama için ayrıntılı bir açıklama aşağıdadır.

Annotation | Açıklama
---------- | -------------------------------------------------------------
`@Route`   | Bir eylemi veya tüm denetleyiciyi bağlama yolu.
`@Request` | Http isteğinden yönteme geçen parametreler.
`@Access`  | Kullanıcı izinlerini kontrol edin.

**Not** Ek açıklamalar yalnızca çok satırlı yoruma yalnızca bir yıldızla değil, iki yıldızla başlarsanız çalışır.

```
// çalışmayacak:
/* @Route("/hello") */

// çalışacak:
/** @Route("/hello") */

// çalışacak:
/**
 * @Route("/hello")
 */
```

### @Route
Denetleyicinin (veya denetleyici eyleminin) monte edileceği yolu tanımlayın. Sınıf ve yöntem tanımlarına açıklanabilir.

Varsayılan olarak, `greetAction` adı verilen bir yöntem, sınıfın rotasının altına `/greet` olarak bağlanır. Özel yollar eklemek için, bir yönteme istediğiniz sayıda ek yol ekleyebilirsiniz. Rotalar, yönteme iletilecek dinamik parametreleri de içerebilir.

```php
/**
 * @Route("/greet", name="@hello/greet/world")
 * @Route("/greet/{name}", name="@hello/greet/name")
 */
public function greetAction($name = 'World')
{
    // ...
}
```

Parametreler belirli gereksinimleri karşılayacak şekilde belirtilebilir (örneğin, değeri sayılarla sınırlayın). Kodunuza başvurabilmeniz için bir rotayı adlandırabilirsiniz. Bir parametreyi isteğe bağlı yapmak için yöntem tanımında PHP bağımsız değişkeni varsayılanlarını kullanın.

Rotalar belirli HTTP yöntemlerine bağlanabilir (örn. `GET` veya` POST`). Bu özellikle RESTful API'leri için kullanışlıdır.

```php
/**
 * @Route("/view/{id}", name="@hello/view/id", requirements={"id"="\d+"}, methods="GET")
 */
public function viewAction($id = 0)
{
    // ...
}
```

**Not** Ayrıntılı bilgi ve daha fazla örnek için `@Route` açıklamasındaki [Symfony'nin kendi belgelerine](http://symfony.com/doc/current/bundles/SensioFrameworkExtraBundle/annotations/routing.html) bakın.

### @Request
Bir istek üzerinden iletilen veri türlerini belirtebilir ve ek açıklama yöntemine iletilen parametrelerle eşleştirebilirsiniz.

Dizi _name_ ile _type_ arasında eşleşir. _name_, istek verilerinin içindeki anahtardır. _type_, bir tamsayı dizisi için `int`,`string`, `array` ve` int[]` gibi gelişmiş türler olabilir. Herhangi bir tür belirtilmezse, varsayılan olarak `string` olarak düşünülür.

Anahtarların sırası, parametrelerin yönteme geçirildiği sırayı tanımlar. Yöntem kafasındaki parametre adı herhangi bir şey olabilir.

```php
/**
 * @Request({"id": "int", "title", "config": "array"}, csrf=true)
 */
public function saveAction($id, $title, $config)
{
  // ...
}
```

Ayrıca, [CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)'e karşı korumak için bir simge olup olmadığını da kontrol edebilirsiniz. İstek ek açıklamalarınıza `csrf=true` ekleyin ve bu yönteme bir form gönderen görünüme` @token` çağrısını ekleyin.

Kullanılabilir filtrelerin tam listesi için `GreenCheap\Filter\FilterManager` sayfasına bakın. Bazı filtrelerde `pregreplace` gibi ek seçenekler bulunur.

```php
/**
 * @Request({"folders":"pregreplace[]"}, options={"folders" = {"pattern":"/[^a-z0-9_-]/i"}})
 */
public function deleteFolders($folders)
{
  // ...
}
```

### @Access
Belirli bir yönteme veya tüm denetleyiciye erişmek için gereken belirli kullanıcı izinlerini belirleyebilirsiniz.

Controllers should always be specific to the frontend or the admin panel. So far, we have seen controllers for the frontend. An administration controller will only be accessible for users with the `Access admin area` permission. Also, all routes for that controller will have a leading `admin/` in the URL. As a result, views will also render in the admin layout and not in the default theme layout.

Denetleyiciler her zaman ön uca veya yönetici paneline özgü olmalıdır. Şimdiye kadar, ön uç için denetleyiciler gördük. Yönetim denetleyicisine yalnızca `Access admin area` izni olan kullanıcılar erişebilir. Ayrıca, bu denetleyicinin tüm yollarının URL'sinde önde gelen bir `admin/` olacaktır. Sonuç olarak, görünümler varsayılan tema düzeninde değil, yönetici düzeninde oluşturulur. Yani, yönetim panelinde bir rota oluşturmak istiyorsanız bu filtreyi kullanmalısınız.

```php
/**
 * @Access(admin=true)
 */
class SettingsController
{
  // ...
}
```

Artık yalnızca _Access admin area_ iznine sahip kullanıcılar denetleyici eylemlerine erişebilir. Daha fazla kısıtlama kullanmak ve yalnızca belirli kullanıcıların belirli işlemleri yapmasına izin vermek istiyorsanız (kullanıcıları yönetme vb.), Tek denetleyici eylemlerine kısıtlamalar ekleyebilirsiniz.

Define permissions in the `extension.php` (or `theme.php`) file and combine them however you want. Access restrictions from the controller level will be combined with access restrictions on the single actions. Therefore you can set a basic _minimum_ access level for your controller and limit certain actions, like administrative actions, to users with more specific permissions.

`extension.php` (veya `theme.php`) dosyasında izinleri tanımlayın ve istediğiniz şekilde birleştirin. Denetleyici düzeyindeki erişim kısıtlamaları, tek eylemlerdeki erişim kısıtlamaları ile birleştirilecektir. Bu nedenle, denetleyiciniz için temel bir _minimum_ erişim düzeyi ayarlayabilir ve yönetim eylemleri gibi belirli eylemleri daha belirli izinlere sahip kullanıcılarla sınırlandırabilirsiniz.

```php
/**
  * @Access("hello: manage users")
  */
  public function saveAction()
  {
    // ...
  }
```

Elbette, denetleyici bir yönetici alanı denetleyicisi olmasa bile bu kısıtlamaları kullanabilirsiniz. Tek denetleyici eylemlerinde yönetici izinlerini de kontrol edebilirsiniz.

```php
/**
  * @Access("hello: edit article", admin=true)
  */
  public function editAction()
  {
    // ...
  }
```

## URL oluşturma
URL hizmetini kullanarak rotalarınıza URL'ler oluşturabilirsiniz.

```php
$this['url']->route('@hello/default/index')          // '/hello/default/index'
$this['url']->route('@hello/default/index', true)    // 'http://example.com/hello/default/index'
$this['url']->route('@hello/view/id', ['id' => 23])  // '/hello/view/23'
or
App::url('@hello/default/index')          // '/hello/default/index'
App::url('@hello/default/index', true)    // 'http://example.com/hello/default/index'
App::url('@hello/view/id', ['id' => 23])  // '/hello/view/23'
```

## Linkler

GreenCheap'in rotaları dahili bir rota söz dizimi ile tanımlanabilir. Bunlar isteğe bağlı olarak GET parametreleri (örn. '@hello/name?name=World') izleyerek yol adından (örn. '@hello/name') oluşur. Buna bağlantı denir. Gerçek rota URI'sini rotanın kendisinden ayırır.
