<p class="uk-article-lead">Yanıt, sunucunun istemciye HTTP yanıtını temsil eder. Aşağıda listelenen ve her biri denetleyici eyleminden gelen yanıtın nasıl oluşturulduğuna dair bir örnek içeren birkaç farklı tür vardır.</p>

## Dizi (String)
Basit bir dize yanıtı döndürmek için `response` hizmetini kullanın.

```php
public function indexAction()
{
    return $this['response']->create('My content');
}
```

## Oluşturulmuş Görünüm

GreenCheap görünümü oluşturabilir ve yanıtı sizin için geri gönderebilir. `$view` tuşu _title_ ve _name_ görünümü içeren bir diziye ayarlanmış bir dizi döndürmeniz yeterlidir.

Dizideki diğer tüm parametrelere görünümden erişilebilir. Görünümler ve Şablon hakkında daha fazla bilgi edinin.

```php
public function indexAction($name = '')
{
    return [
        '$view' => [
            'title' => 'Hello World',
            'name' => 'hello:views/index.php',
        ],
        'name' => $name
    ];
}
```

Bunun aşağıda açıklandığı gibi temalı bir yanıt vermesini istemiyorsanız, `$view` `'layout' => false` değerini ayarlayın.

## Temalı
Temalı bir yanıt, denetleyicinin sonucunu, genellikle tema tarafından tanımlanan çevreleyen bir düzen içine gömer. Denetleyiciden bir dize döndürmeniz yeterlidir.

```php
public function indexAction()
{
    return 'My content';
}
```

## JSON
Denetleyiciden bir JSON yanıtı döndürmenin iki yolu vardır:

Eylem bir dizi veya `\JsonSerializable` uygulayan bir nesne döndürürse, otomatik olarak bir `JsonResponse` oluşturulur.

```php
public function jsonAction()
{
    return ['error' => true, 'message' => 'There is nothing here. Move along.'];
}
```

Tabii ki, `response` hizmeti aynı şeyi elde etmek için kullanılabilir.

```php
public function jsonAction()
{    
    return $this['response']->json(['error' => true, 'message' => 'There is nothing here. Move along.']);
}
```

## Yönlendirme
Kullanıcıyı yönlendirmek için bir yönlendirme yanıtı kullanın.

```php
public function redirectAction()
{
    return $this['response']->redirect('@hello/greet/name', ['name' => 'Someone']);
}
```

## Custom response and error pages
`create` komutunu kullanarak herhangi bir özel HTTP yanıtını döndürün.

```php
public function forbiddenAction()
{
    return $this['response']->create('Permission denied.', 401);
}
```

## Stream
Akış yanıtı, içeriğin istemciye aktarılmasını sağlar. İlk argüman olarak bir geri çağırma işlevi alır. Bu geri arama içinde, doğrudan müşteriye bir `flush` çağrısı gönderilir.

```php
public function streamAction()
{
    return $this['response']->stream(function() {
        echo 'Hello World';
        flush();
        echo 'Hello GreenCheap';
        flush();
    });
}
```

## Download

İndirme yanıtı, istemciye bir dosya göndermenizi sağlar. Çoğu tarayıcıda _Save as_ iletişim kutusunu zorlamak için `Content-Disposition: attachment` ayarını yapar.

```php
public function downloadAction()
{
    return $this['response']->download('extensions/hello/extension.svg');
}
```
