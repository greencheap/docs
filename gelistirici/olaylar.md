Modern web uygulamasında iletişim için popüler bir kavram etkinliklerdir. Kod yürütmenin belirli bir aşamasında bir olay tetiklenir. Uzantılarınız da dahil olmak üzere diğer tüm kodlar bir veya daha fazla etkinliğe kaydolabilir ve belirli bir zamanda işlem yapabilir.

Bir olay her zaman tanımlayıcısı, benzersiz bir dize (GreenCheap Uygulamasının önyükleme aşamasında tetiklenen olay için `boot`) ile tanımlanır.

Bu belgede dinleyebileceğiniz mevcut olaylar ve GreenCheap'de bir olay dinleyicisini nasıl kaydedebileceğiniz hakkında bilgi edineceksiniz.

## Sistem Olayları

GreenCheap, sayfa isteğinin yaşam döngüsü boyunca bir dizi etkinlik sağlar:


- `boot`: Green Cheap uygulamasının önyükleme aşaması başladı.
- `request`: Çekirdeğin istek işleme aşaması başladı.
- `controller`: Bir denetleyici eylemi çağrılmak üzere.
- `response`: Yanıt tarayıcıya gönderilmek üzere.
- `terminate`: Green Cheap başvurusunun cevabı başarıyla gönderildi.
- `exception`: Bir istisna oluştu.


## Auth-Olaylar

Tüm yetkilendirme etkinlikleri `GreenCheap\Auth\AuthEvents` içinde tanımlanmıştır.

## Veritabanı / EntityManager

Yüklenen, güncellenen veya oluşturulan her varlık için belirli bir olay tetiklenir. Örneğin, bir widget yüklenirse bir `model.widget.init` olayı tetiklenir.

Varlık olay adları için şema `model.entity_short_name.event_name`dir. Bu genel olay sistemi, tek varlıkları dinlemenizi sağlar.

Tüm EntityManager olaylarının listesini `GreenCheap\Database\Events`'de bulabilirsiniz.

## Yönlendirici

Yönlendirici, bir rota yürütülmeden önce ve sonra bir olayı tetikler. Her olay adı yürütülen URL'yi içerir: `before@site/api/node/save` or `after@system/settings/save`

## EventListener'a kaydolun

Bir sayfa kaydedildiğinde çağrılan bir dinleyici kaydedelim.

Dinleyiciyi `index.php` paketinize kaydetmelisiniz:

```
return [
    // paket tanımınız

    'events' => [

        'boot' => function ($event, $app) {
            $app->subscribe(new \Acme\Listener\PostSaveListener());
        }
    ]
];
```

Ve dinleyici kodu:

```
<?php

namespace Acme\Listener;

use GreenCheap\Event\Event;
use GreenCheap\Event\EventSubscriberInterface;

class PostSaveListener implements EventSubscriberInterface
{
    /**
     * {@inheritdoc}
     */
    public function subscribe()
    {
        return [
            'model.page.saved' => 'onSaved',
        ];
    }

    /**
     * @param Event $event
     * @param object $model The saved entity
     */
    public function onSaved(Event $event, $model)
    {
        // your code
    }
}
```