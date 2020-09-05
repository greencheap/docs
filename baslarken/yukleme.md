<p class="uk-article-lead">GreenCheap'in kurulum süreci hızlı ve kolaydır ve sadece birkaç dakika sürer. GreenCheap'i şimdi `Cpanel` yüklü bir sunucuda kurmayı göreceğiz. Bu yüzden kurulum işlemi yapmadan önce [Gereksinimler](/docs/gereksinimler) bölümünü incelemenizi tavsiye ederiz.</p>

## Gerekli dosyaların temin edilmesi
Öncelikle GreenCheap tarafından resmi dağıtılan paketi <a href="https://greencheap.net/version" target="_blank">GreenCheap.net'den indirmeniz</a> gerekmektedir.
İndirdiğiniz `.zip` uzantılı dosyayı açmadan direk kendi hostunuza upload edin ve orada bu zip dosyasını çıkartın.

**Not:** `.htaccess` gibi dizli dosyaların olması sebebi ile bilgisayarınıza açma işlemi yaparsanız, bunun gibi dosyaları sunucunuza yüklemeyi unutabilirsiniz.


## Kurulum Süreci

### İlk Adım

Eğer sayfanızı açtığınızda aşağıdaki ekrana ulaştıysanız herşey yolunda demektir. 

**Not:** Eğer yerine farklı bir hata alıyorsanız, sunucu yönetimi ile ilgili problemler yaşıyor olmalısınız. Bunun için [Gereksinimler](/docs/gereksinimler) bölümünü tekrar incelemenizi tavsiye ederiz.

Ok butonuna basarak [İkinci adıma](#-kinci-ad-m) geçebiliriz.

![Greencheap ilk ekran](storage/docs-belgeler/greencheap-ilk-ekran.png)

### İkinci Adım

GreenCheap size bir çok dil seçeneği sunabilir. Hali hazırda şuanda sadece `Türkçe` ve `İngilizce` dillerini sunabiliyor. Ancak ilerleyen vakitlerde ihtiyaca yönelik farklı ülkelerin dil paketleride yüklenebilir.

**Not:** Eğer dil paketlerinin güncellenmesinde destek olmak istiyorsanız, <a href="https://www.transifex.com/greencheap/greencheap-cms" target="_blank" rel="nofollow">Transifex GreenCheap</a> projesinden bize destek olabilirsiniz.

Dil seçiminizi yaptıysanız [Üçüncü adıma](#-nc-ad-m) geçebilmek için `Sonraki` butonuna basın.

![Greencheap ikinci ekran](storage/docs-belgeler/greencheap-ikinci-ekran.png)

### Üçüncü Adım

Veritabanı seçimi için size 3 seçenek sunuyoruz. `Sqlite`, `Mysql` ve `Postgresql`

#### Sqlite

Eğer küçük bir işletmeye bir web sitesi yapılacaksa biz `Sqlite` kullanmanızı tavsiye ederiz. Bu tamamen güvenli ve maliyeti çok düşüktür.

#### Mysql

Aşağıdaki tabloda açıklamalara yer verilmiştir.

|İşlev			|Açıklama|
|-----			|--------|
|Host Adı		|Eğer veritabanını sunucuzda barındıryorsanız `localhost` şeklinde bırakabilirsiniz.|
|Kullanıcı		|Yetkilendirilmiş Sql kullanıcını yazın.|
|Şifre			|Sql kullanıcınız için belirlediğiniz şifreyi girin.|
|Veritabanı Adı	|Oluşturduğunuz veritabanı adını girin.|
|Tablo Öneki	|Bu madde bilmeyenler için kafa karışıklığına sebep olabilir, fakat çok da bilinmesi gereken bir şey değildir. Eğer spesifik bir veritabanı kurmayacaksanız `gc_` gibi bırakabilirsiniz.|

Veritabanı bağlantısını yaptıysanız [Dördüncü adıma](#d-rd-nc-ad-m) geçebilmek için `Sonraki` butonuna basın.

![Greencheap ücüncü ekran](storage/docs-belgeler/greencheap-ücüncü-ekran.png)

### Dördüncü Adım

Veritabanı bağlantısınıda yaptığımıza göre sıra geldi Web sitemizin adı ve admin kullanıcısını oluşturmaya

|İşlev				|Açıklama|
|-----				|--------|
|Site Başlığı		|Web sitenizin adını girmelisiniz Örn: `GreenCheap CMS`.|
|Kullanıcı Adı		|Yönetici hesabınız için bir kullanıcı adı tanımlayın Örn: `admin`.|
|Şifre				|Yönetici hesabınız için bir şifre girin.|
|Email				|Yönetici hesabınız için bir email adresi belirleyin.|

Eğer kullanıcınızıda oluşturduysanız [Son Adıma](#d-rd-nc-ad-m) geçebilmek için `Sonraki` butonuna basın.

![Greencheap dorduncu ekran](storage/docs-belgeler/greencheap-dorduncu-ekran.png)

### Son Adım

Son adım artık kurulumun tamamlanıp sizi `Yönetim Paneline` atması ile tamamlanır. Girdiğiniz yönetici kullanıcı adı ve şifresi ile yönetim paneline erişebilirsiniz.

![Greencheap besinci ekran](storage/docs-belgeler/greencheap-besinci-ekran.png)