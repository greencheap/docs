# Dosya Yapısı

<p class="uk-article-lead">GreenCheap kullanmaya başladığınızda, dosya yapısı etrafında yolunuzu bilmeniz önemlidir. GreenCheap, çekirdek kod ve üçüncü taraf dosyalarının çok net bir şekilde ayrıldığından, bu çok önemli olmamalıdır.</p>

## Dosya sistemi genel bakış

Kısa bir genel bakış için aşağıdaki listeye bir göz atın.

```
/app                      // ana sistem dosyaları
  assets                  // sistem varlıkları
  console                 // konsol uzantı dosyaları
  installer               // çekirdek, Yükleme / Güncelleme uzantı dosyaları
  modules                 // çekirdek modül dosyaları. Her modülün kendi alt klasörü vardır
  system                  // çekirdek Sistem uzantısı dosyaları
  vendor                  // GreenCheap tarafından kullanılan harici kütüphaneler
/packages                 // GreenCheap paketleri ve 3. taraf paketleri
  composer                // paketler ile ilgili dosyalar
  greencheap              // GreenCheap varsayılan paketler
    blog                  // varsayılan Blog eklentisi
    theme-one             // GreenCheap ile dağıtılan varsayılan tema
/storage                  // site medya dosyaları. Bu konumu Sistem > Ayarlar bölümünden değiştirebilirsiniz
/tmp                      // geçici dosyalar
  cache                   // önbellek dosyaları
  logs                    // log dosyaları
  packages                // geçici paket dosyaları
  sessions                // dosya tabanlı kullanıcı oturumları
  temp                    // genel geçici dosyalar
.htaccess                 // Apache yapılandırma dosyası. Apache kullanıyorsanız var olduğundan emin olun
CHANGELOG.md              // changelog dosyası
config.php                // kurulum sırasında oluşturulan yapılandırma dosyası
greencheap                // CLI giriş noktası
greencheap.db             // veritabanı dosyası (sadece SQLite kullanılıyorsanız mevcuttur)
```

## Keşfedilecek yerler

Her zaman yeni bir projenin yapısına alışmak biraz zaman alsa da, önemli kısımlarda hızlı bir şekilde yolunuzu bulacaksınız. Bilmeniz gereken en önemli şey, geliştirdiğiniz temaların ve uzantıların her zaman `/packages` dizininde, satıcı adınızın bulunduğu bir alt klasörün içinde yer almasıdır. Satıcı adı ise şirket adınız veya genel kullanıcı adınız olabilir, mesela bizim satıcı adımız greencheap diğe geçer.

Ayrıca, ilham almak ve GreenCheap kavramlarını daha iyi anlamak için `/packages/greencheap`'de bulunan resmi paketlere bakmak iyi bir fikirdir. Ayrıca, modül deseni ile neler yapılabileceğine ilişkin örnekleri görmek için `/app/modules` ve `/app/system/modules` modüllerini kontrol edin.
