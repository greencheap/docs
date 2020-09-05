<p class="uk-article-lead">Bir paket Green Cheap'in işlevselliğini genişletme konseptidir. Paketler iki farklı türde gelir: Eklentiler ve Temalar.</p>

## Paket yeri

Tüm paketler, satıcılarına göre alt dizinlerde sıralanmış olan `/packages` dizininde bulunur.

Her paket belirli bir satıcıya aittir, örneğin _Blog_ uzantısı ve _One teması_ da dahil olmak üzere tüm resmi paketler için `greencheap` dosyasından erişebilirsiniz.

Satıcı adı, bir geliştiricinin veya kuruluşun benzersiz bir temsilidir. En basit durumda, sadece GitHub kullanıcı adıyla eşleşir. Paket adı ayrıca depolandığı dizinin adını da tanımlar.

## Paket içeriği
Bir paket en az iki dosya içerir.
1. `composer.json`, paketinizin meta verilerini içerir ve bu nedenle paket tanımı olarak işlev görür.
2. `index.php`, Modül tanımı olarak adlandırılır ve Green Cheap'e gerçek işlevsellik katar.

Paket içeriğinin geri kalanı paketin türüne bağlıdır. Bir paketin gerçek içeriği hakkında daha fazla bilgi edinmek için Tema öğreticisine veya Uzantı öğreticisine göz atın.

## Paket tanımı
Bir paket "composer.json" ile tanımlanır. Bu dosya, paket adını, [Composer](https://getcomposer.org) tarafından kurulacak potansiyel bağımlılıkları ve GreenCheap pazarında görüntülenen diğer bilgileri içerir.

Bir tema için bu dosya aşağıdaki gibi görünebilir.

```json
{
    "name": "greencheap/theme-hello",
    "type": "greencheap-theme",
    "version": "0.9.0",
    "title": "Hello",
    "description": "A blueprint to develop your own themes.",
    "license": "MIT",
    "authors": [
        {
            "name": "GreenCheap",
            "email": "support@greencheap.net",
            "homepage": "http://greencheap.net"
        }
    ],
    "extra": {
        "image": "image.jpg"
    }
}
```

Bu dosya hakkında daha fazla ayrıntı için bkz. [Besteci Belgeleri](https://getcomposer.org/doc/01-basic-usage.md).

## Yükleme kancaları
Bir paket etkinleştirilebilir, devre dışı bırakılabilir veya yüklenemez. Durumu değiştirirken, veritabanı şemanızı değiştirmeniz veya başka bir özel kod çalıştırmanız gerekebilir.

Green Cheap, özel bir komut dosyası aracılığıyla kurulum kancaları sunar. Bu dosyanın `composer.json` dosyası olan Paket tanımınızda tanımlanması gerekir.

```json
    "extra": {
        "scripts": "scripts.php"
    }
```

Scripts komut dosyası, geri çağrılar içeren bir PHP dizisi döndürmelidir.

```php
return [

    'install' => function ($app) {},
    'uninstall' => function ($app) {},
    'enable' => function ($app) {},
    'disable' => function ($app) {},
    'updates' => [

        '0.5.0' => function ($app) {},
        '0.9.0' => function ($app) {}

    ]
];
```

### Install

Yükleme kancası, bir paket _installed_ işleminden sonra yürütülür.

### Uninstall
Kaldırma kancası bir paket _uninstalled_'den önce yürütülür.

Green Cheap, uzantınız yönetici panelinde _disabled_ veya _uninstalled_ olsa bile, oluşturduğunuz tabloları değiştirmez. Gerekli veritabanı değişikliklerini kendiniz halletmeniz gerekecektir.

### Enable
Enable hook bir paket _enabled_ yapıldıktan sonra yürütülür.

### Disable
Devre dışı bırakma kancası, bir paket _disabled_ olmadan önce yürütülür.

### Updates
Bir paket etkinleştirildiğinde, Green Cheap geçerli sürümden daha yeni güncelleme kancalarının olup olmadığını kontrol eder. Eğer öyleyse, sırayla yürütülürler.