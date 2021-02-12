# Yapılandırma Dosyası

<p class="uk-article-lead">GreenCheap yapılandırma dosyası, GreenCheap'i kurduğunuzda otomatik olarak oluşturulur. Yapılandırma ayarlarını manuel olarak değiştirmek isterseniz, bu makale dosyanın sözdizimini ve içeriğini açıklar.</p>

Genellikle, yükleyici tarafından oluşturulduktan sonra yapılandırma dosyası `config.php` ile uğraşmanıza gerek yoktur. Yapılandırmayı değiştirmenin normal yolu, GreenCheap yönetici panelindeki _System > Settings_ sayfasıdır'dır.

Bazen bu dosyayı manuel olarak düzenlemek, örneğin bozuk bir kurulumda sorun giderirken veya mevcut bir GreenCheap kurulumunu yeni bir sunucuya taşırken gerekli ve kullanışlıdır.

Aşağıdaki kod listesinde, en yaygın ayarlara sahip bir örnek yapılandırma görüyorsunuz.

Genellikle tek bir veritabanı bağlantınız vardır. Örnek, yapılandırmanın farklı veritabanı sürücüleri için nasıl çalıştığını gösteren her iki örneği de içerir. GreenCheap tarafından yalnızca `varsayılan` bağlantı kullanılacaktır (bu örnekte `sqlite` kullanılmıştır).

```php
'database' => [
  'default' => 'sqlite',        // varsayılan veritabanı bağlantısı
  'connections' => [            // veritabanı bağlantıları dizisi
    'sqlite' => [               // veritabanı sürücüsü adı, burada: sqlite
      'prefix' => 'gc_',        // her tablonun önüne önek
    ],
    'mysql' => [                // veritabanı sürücüsü adı, burada: mysql
      'host' => 'localhost',    // sunucu ana bilgisayar adı
      'user' => 'user',         // sunucu kullanıcı adı
      'password' => 'pass',     // sunucu kullanıcı şifresi
      'dbname' => 'greencheap', // veri tabanı ismi
      'prefix' => 'gc_'         // her tablonun önüne önek
    ],
  ]
],
'system' => [
  'secret' => 'secret'          // kurulum sırasında oluşturulan gizli bir dize
],
'system/cache' => [
  'caches' => [
    'cache' => [
      'storage' => 'auto'       // etkinleştirilmişse kullanılacak önbellek yöntemi
    ]
  ],
  'nocache' => false            // önbellek durumu - true olarak ayarlayarak tamamen devre dışı bırakın
],
'system/finder' => [
  'storage' => '/storage'       // yüklemeler, önbellek vb. için kullanılan bir klasöre göreceli yol
],
'application' => [
  'debug' => false              // hata ayıklama modu durumu, geliştirme sırasında hata ayıklama çıktısını almak için etkinleştirin
],
'debug' => [
  'enabled' => false            // araç çubuğu durumunda hata ayıklama, bilgi alma, istekler, rotalar vb.
]
```
