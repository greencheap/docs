# Uygulama

<p class="uk-article-lead">*Uygulama*, GreenCheap'in bağımlılık konteyneri olarak işlev görür. Uygulama, GreenCheap'in işlevselliğini ve hizmetlerini `Modüller Sayfası` boyunca yapılandırılabilir, genişletilebilir, değiştirilebilir ve erişilebilir kılar.</p>

Green Cheap'de kullanabileceğiniz tüm hizmetler, `Uygulama` örneğinde bağımlılık olarak enjekte edilen özellikler olarak ayarlanır. Örneğin `$app['db']` veritabanı hizmetine erişmenizi sağlar.

## Bir hizmete erişim

`Uygulama` örneğine erişmek için temel olarak iki yol vardır. Şu anda bulunduğunuz bağlama bağlı olarak, bir `$app` değişkenine veya `GreenCheap\Application` sınıfına statik bir çağrı yoluyla erişebilirsiniz.

```php
// Getter
$app['cache']

use GreenCheap\Application as App;
App::cache();
```

Gördüğünüz gibi, kapsayıcı hizmetlerine erişmek için sihirli bir `__call` yönteminin yanı sıra `\ArrayAccess` uygular.

## Hizmet Tanımlama
Uygulamaya bir hizmet eklemek, kapsayıcı üzerinde bir dizi anahtarı bir kapatma olacak şekilde ayarlanarak kolayca gerçekleştirilebilir. Bu, ilk kez erişilinceye kadar değerlendirilmez.

```php
$app['cache'] = function () {
    return new Cache();
};
```
