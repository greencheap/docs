# NetGsm Api

NetGsm Api <a href="https://www.netgsm.com.tr" target="_blank" ref="nofollow">NetGsm</a> firmasının API dökümantasyonundan yararlanılarak hazırlanmış, open source bir kütüphanedir. PHP ile geliştirilmiş bu kütüphane ile kullanıcılarınıza Sms, Voice Sms vb. işlemleri yapabilirsiniz. 

Bu uygulamayı kullanabilmek için hali hazırda NetGsm hesabına sahip olmanız ve bu hesabın API işlemlerine erişilebilir olması gerekmektedir. Ayrıntılı bilgi için <a href="https://www.netgsm.com.tr" target="_blank" ref="nofollow">NetGsm</a> firması ile iletişime geçebilirsiniz.

### Sistem Gereksinimleri

Sunucunuzun aşağıdaki gereksinimleri karşıladığından emin olun.

[SimpleXML](http://php.net/manual/book.simplexml.php), [cURL](http://php.net/manual/book.curl.php)

### Kurulum

Kullanımı çok basittir ve sadece bir kaç işlem ile kullanmaya hazır olacaksınız. Bu kütüphaneyi kullanmak için [Composer](https://getcomposer.org) gerekmektedir.

	composer require greencheap/library-netgsm
    
### Hazırlama

NetGsm Api size component yapısı sunar, bu işlemde size gereksiz maliyetden kaçmanıza olanak sağlar ve bu hedeflenmiştir.

```php
require('./vendor/autoload.php');

use GreenCheap\NetGsm;

$netgsm = new NetGsm(3120000000 , 0000);
```

NetGsm sınıfı sizden 3 parametre girmenizi bekler;
- *Id:* NetGsm firmasından size temin edilen numara başında 0 olmadan.
- *Password:* API hesabı için belirlediğiniz şifre
- *Name:* `(Zorunlu değildir)` birlikte onaylanmış gönderici başlığı

Yukarıdaki örnek ile bu kütüphaneyi kullanmaya hazır olduğunuzu gösterir. Bundan sonraki işlemler için NetGsm Api componentlerini kullanabilirsiniz.

### SMS Foundation
Bu component NetGsm'in size verdiği Sms işlemlerini uygulamanıza yardımcı olur.

#### Sms Gönderimi

```php
require('../vendor/autoload.php');

use GreenCheap\NetGsm;
use GreenCheap\Components\SmsFoundation;

$netgsm = new NetGsm(3120000000 , 0000);
$smsFoundation = new SmsFoundation($netgsm);
$msg = $smsFoundation->sendMessage('5550000000' , 'Merhaba Dünya! Ben GreenCheap');

print_r($msg);
```

Çıktı:

    status => success
    code => 00
    message => 00 612771191
    
### Hata Mesajları

Gönderme işlemleri sırasında çıktılarda `status` anahtarında `error` hatasını görebilirsiniz. Haliyle işlerin ters gittiğini size gösterir. Bu konu ile ilgili tam dökümantasyon aşağıda verilmiştir.

|Kodu|Açıklama|
|----|--------|
|`20`|Mesaj metninde ki problemden dolayı gönderilemediğini veya standart maksimum mesaj karakter sayısını geçtiğini ifade eder.|
|`30`|Geçersiz kullanıcı adı , şifre veya kullanıcınızın API erişim izninin olmadığını gösterir.Ayrıca eğer API erişiminizde IP sınırlaması yaptıysanız ve sınırladığınız ip dışında gönderim sağlıyorsanız 30 hata kodunu alırsınız. API erişim izninizi veya IP sınırlamanızı , web arayüzden; sağ üst köşede bulunan ayarlar> API işlemleri menüsunden kontrol edebilirsiniz.|
|`40`|Mesaj başlığınızın (gönderici adınızın) sistemde tanımlı olmadığını ifade eder. Gönderici adlarınızı API ile sorgulayarak kontrol edebilirsiniz.|
|`70`|Hatalı sorgulama. Gönderdiğiniz parametrelerden birisi hatalı veya zorunlu alanlardan birinin eksik olduğunu ifade eder.|

#### Gelen Smsler
Bu fonksiyon ile iki tarih arasında belirlediğiniz mesajlarınız, size bir dizi şeklinde getirilir.

`Not: `NetGsm'den kaynaklı bir problemden dolayı bu fonksiyon kullanımında 60 hata türünü alabilirsiniz. Bu durum Netgsm firmasından kaynaklı oluşmaktadır.

```php
require('../vendor/autoload.php');

use GreenCheap\NetGsm;
use GreenCheap\Components\SmsFoundation;

$netgsm = new NetGsm(3120000000 , 0000);
$smsFoundation = new SmsFoundation($netgsm);

$startDate = new \DateTime();
$stopDate = new \DateTime();
$getMessages = $smsFoundation->getMessages($startDate->modify('-1 day')->format(NetGsm::DATETIME) , $stopDate->format(NetGsm::DATETIME));

print_r($getMessages);
```