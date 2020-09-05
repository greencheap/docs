<p class="uk-article-lead">GreenCheap PHP'de yazılmıştır ve çeşitli web sunucusu yapılandırmalarında çalışabilir. Apache 2.2+ ve nginx için resmi destek mevcuttur.</p>

## Apache 2.2+
GreenCheap'in ek yapılandırma olmadan Apache 2.2+ üzerinde sorunsuz çalışması gerekmesine rağmen, kurulum sırasında bir uyarı mesajı alabilirsiniz. Bunu yaparsanız, GreenCheap klasörünüzün kökünde `.htaccess` dosyasının mevcut olduğunu doğrulamalısınız.

**Not** `.htaccess` dosyası bir Apache yapılandırma dosyasıdır ve Unix tabanlı sistemlerde gizlidir; bu nedenle başlangıçta paketi yüklerken gözden kaçırmak kolaydır. Mevcut değilse, GreenCheap paketinden kopyalayın.

Web sunucunuzun, sunucu yapılandırmasının bir `.htaccess` dosyası aracılığıyla geçersiz kılınmasına izin vermemesi de mümkündür. Bu durumda, barındırma sağlayıcınızla iletişime geçin ve AllowOverride yönergesini değiştirmesini isteyin.

Diğer bir yaygın sorun, web sunucunuzda `mod_rewrite` modülünün etkin olmamasıdır, bu durumda, bu Apache modülünü etkinleştirmek için barındırma sağlayıcınıza başvurmanız gerekir. Modül mevcut değilse, GreenCheap yine de çalışacak ancak `http://example.com/index.php/page/welcome`. biçimindeki bir URL biçimine geri dönecektir.

## nginx

Nginx ile, [PHP'den Nginx'e](http://wiki.nginx.org/PHPFcgiExample) bağlayın. Nginx yapılandırmanızı [temel örnek yapılandırmasına](https://gist.github.com/DarrylDias/be8955970f4b37fdd682) göre güncelleyin. Unutmayın, Apache çözümünün kutudan çıktığı haliyle, varlıklar için sıkıştırma ve önbellek başlıkları gibi yapılandırmasından daha fazla özellik sağlar. Bunlar şu anda nginx yapılandırmasına dahil edilmemiştir.
