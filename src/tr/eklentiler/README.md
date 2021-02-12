# Google Analytics

Bu api ile çalışan *Google Analytics* Report eklentisidir. Paket size en çok tercih edilen Analytics raporlarını yönetim panelinde görebilmenizi sağlar. Bu eklentiyi Pazar Yerinden kurduktan sonra yapmanız gereken bir kaç işlem vardır.

## Nasıl Analytics Yetkisi Verilir
Eklentinin sizin Mülkünüzden veri çekebilmesi için *GreenCheap*'in size verdiği email servisini, mülkünüzde *Okuma* yetkisi ile eklemeniz gerekir.

<a href="http://analytics.google.com/" target="_blank" rel="nofollow">Google Analytics Yönetim Paneli</a> için bu linke tıklayın ve açılan sayfada sol alt tarafdaki *Yönetici* sekmesine geçin.

![Yonetici area](storage/docs-belgeler/googleanalytics/yonetici-area.png)


Açılan sayfada en sağ bölgedeki *Görünüm* sekmesinden *Görünüm Kullanıcı Yönetimi* sekmesine geçin.

![Yonetici area1](storage/docs-belgeler/googleanalytics/yonetici-area1.png)

Açılan pencerede *Yeni bir kullanıcı* ekleyebilmeniz için sağ üst köşedeki mavi butona basın. Yeni bir sayfa açılacaktır ve aşağıdaki resim gibi gözükecektir. 

E-posta kısmına `greencheap@greencheap.iam.gserviceaccount.com` mail adresini ekleyin ve *İzinler* bölgesinden *Okuma ve Analiz Etme* tikini etkinleştirin. Bu hesap eklenti ile ara köprüyü oluşturarak sizin verilerinizi yönetim panelinde göstermenizi sağlayacaktır.

![Yonetici area2](storage/docs-belgeler/googleanalytics/yonetici-area2.png)

Yönetim panelinde Apinin çalışabilmesi için son bir işlem kaldı. *Yönetici* sekmesinde en sağ tarafdan *Görünüm Ayarları* sekmesine geçin ve açılan sayfada *Görünüm Kimliği* numarasını kopyalayın bu size birazdan lazım olacak.

## Eklenti Ayarları

Web sitenizin *Dashboard*'a girin. Yeni bir widget ekleyin ve *Google Analytics* widget'ını başlatın. Eklenen *Widget*'ı düzenleme sekmesine tıklayın ve *Open Settings* butonuna basın. Aşağıdaki görüntüyü alacaksınız. Kopyaladığınız *Web View*'ı input alanına girin ve *Test API* butonuna basarak bağlantınızı test edin.

![Analytics settings](storage/docs-belgeler/googleanalytics/analytics-settings.png)