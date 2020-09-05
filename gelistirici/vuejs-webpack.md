## Terminoloji

**Vue.js**, etkileşimli web arayüzleri oluşturmak için bir Javascript çerçevesidir. JavaScript nesnelerini (modeliniz) ve oluşturulan şablonları (görünümünüz) senkronize halde tutmaya özen gösterir. Vue.js belgelerinde harika bir giriş makalesi bulunabilir. Uygulamalı [Getting started guide](http://vuejs.org/guide/) 'na göz atın ve diğer [high level concepts](http://blog.evanyou.me/2015/10/25/vuejs-re-introduction/) hakkında bilgi edinin çerçevenin.

**Vue bileşenleri**, iyi tanımlanmış işlevsellik içeren ve tipik olarak bileşende gerçekleşen etkileşimi tanımlamak için bir görünüm şablonu ve bir komut dosyası içeren mantıksal kod varlıklarıdır. GreenCheap'te, sisteme ekleyebileceğiniz birçok varlık Vue bileşenleri olarak oluşturulur ve GreenCheap sistemine kaydedilir. Bu, Widget'ları, Dashboard Widget'ları ve Bağlantı türlerini içerir. Kod açısından, genellikle JavaScript kodunu bir HTML şablonuyla birleştiren `*.vue` dosyalarında bulunurlar. Bu `*.vue` dosyaları daha sonra Webpack kullanılarak saf `*.js` dosyalarına derlenebilir (aşağıya bakın). Ancak, `*.js` dosyalarında Vue bileşenleri de oluşturabilirsiniz, bileşenin kullandığı şablon daha sonra farklı bir dosyada tanımlanır veya basit bir dize olarak verilir. Bu durumda Webpack'e ihtiyacınız yoktur.

**Webpack**, geliştirme varlıklarınızı (Vue bileşenleri ve düz Javascript dosyaları gibi) alan ve bunları sözde paketler halinde birleştiren bir modül paketleyicisidir. Bu, JavaScript dosyalarını basitçe birleştirip küçültmekten farklıdır. Basitçe söylemek gerekirse, web paketi paketlerinde yalnızca geçerli sayfada gerekli olan modüller yüklenir. [motivation behind Webpack](http://webpack.github.io/docs/motivation.html) hakkında daha fazla bilgi edinmek için belgelerine gidin.

**Not** Yaygın bir yanılgı, GreenCheap uzantılarını geliştirirken Webpack kullanmanız gerektiğidir. Olay bu değil. Başlamanız daha kolaysa, tek bir JavaScript dosyası oluşturun ve ekleyin. Daha sonra bir Web paketi tabanlı kuruluma geçebilirsiniz.

## Webpack olmadan dosya yapısı

Vue.js'yi Webpack'i kurmadan kullanmak istiyorsanız, todo extension'nda bir örnek bulunmaktadır.

## Neden Webpack kullanmalı?

Webpack olmadan, basit bir Vue bileşeni örneği, `example.js` adlı bir dosyada bulunan şu şekilde görünebilir:

```
new Vue({
  el: '<div>{{ message }}</div>',
  data: {
    message: 'Hello GreenCheap!'
  }
})
```

Webpack'i kullanmamayı tercih ediyorsanız, bu çözüm tamamen iyidir. Bununla birlikte, `*.vue` şablonlarını derlemek için Webpack kullanmak, dosyalarınız için güzel bir organizasyon yapısı sağlar. Hem işaretlemeyi okunabilir bir şekilde hem de JavaScript kodunuzu `example.vue` adlı bir dosyada tanımlayabilirsiniz:

```
<template>

	<div>
  		{{ message }}
	</div>

</template>

<script>
	module.exports = {
		data: {
    		message: 'Hello GreenCheap!'
  		}
  	}
</script>
```

Gördüğünüz gibi, bir şablonu hantal bir dizge olarak tanımlamanıza gerek yok. Bunun yerine, Webpack okunabilir `*.vue` dosyasını dönüştürür ve onu bir satır içi dizeye dönüştürülmüş şablon işaretiyle `*.js` dosyasına derler.

Webpack, terminalinizde çalışan ve ardından `*.vue` dosyalarını `*.js` dosyalarına derleyen bir araçtır. GreenCheap'in kök düzeyinde varsayılan bir `webpack.config.js` vardır. GreenCheap klasöründe `webpack` veya `webpack --watch` çalıştırdığınızda, `packages` alt klasörlerindeki tüm temaları ve uzantıları tarar. `Beta Sürümde Tekrar Aktif Edilecek`

Paketinizin ayrıca paketinizde kendi `webpack.config.js` ye sahip olması gerekir, örneğin `packages/greencheap/example/webpack.config.js`. Bu dosya, hangi `*.vue` dosyalarının derleneceğini ve hangi çıktı dosyasında derlenmeleri gerektiğini tanımlar.

Aşağıdaki örnek, `*.vue` dosyalarınızın paketinizin `packages/greencheap/example/app/components` adlı bir alt klasöründe bulunduğunu ve `packages/greencheap/example/app/bundle` çıktı klasöründe derlenmesi gerektiğini varsayar. `/bundle`.

```
module.exports = [

    {
        entry: {
            "example"  : "./app/components/example.vue",
            "example-2": "./app/components/example-2.vue",
            "example-3": "./app/components/example-3.vue"
        },
        output: {
            filename: "./app/bundle/[name].js"
        },
        module: {
            loaders: [
                { test: /\.vue$/, loader: "vue" }
            ]
        }
    }

];
```

Şimdi terminali açın, GreenCheap kök klasörüne gidin ve eklediğiniz yapılandırmayı kullanarak Webpack'i çalıştırmak için `webpack` veya `webpack --watch` komutunu çalıştırın. Paketinizin `app/bundle` klasöründe `*.js` dosyalarını göreceksiniz. Örneğin, `example.vue`, `example.js` adlı bir paket dosyasında derlenir.

**Not** Kodunuzu Git aracılığıyla yönetirken, `.gitignore` dosyanıza `app/bundle` klasörünü eklemenizi öneririz çünkü yalnızca `*.vue` bileşenlerinizin derlenmiş sürümlerini içerir.

Derlenmiş Vue bileşenlerini yüklemek ve kullanmak için derlenmiş paket dosyasını, örneğin `views/example.php` adlı bir dosyadan görünüm şablonunuzdan yükleyin. Ayrıca, bileşeninizin yalnızca Vue'nun komut dosyası yüklendikten sonra yüklenmesi için üçüncü parametre aracılığıyla `vue` gerektirmeniz gerekir.

```
<?php $view->script('example', 'hello:app/bundle/example', 'vue') ?>
```

## Vue bileşenlerini oluşturun ve kaydedin

Dosya yapısı kurulumu ile artık kendi komut dosyalarınızı ve Vue bileşenlerinizi oluşturabilirsiniz. Yukarıda açıklanan varsayılan durum, kendi görünüm dosyalarınıza dahil ettiğiniz varlıklar hakkında konuşur. Bununla birlikte bazı durumlarda, GreenCheap yönetici arayüzünün belirli bölümlerinde görüntülenmesi için GreenCheap sistemine kaydettirmek istediğiniz bir Vue bileşeni oluşturursunuz. Bunu aşağıdaki öğeler için yapabilirsiniz:

* Dashboard widgets
* Site Widgets
* Link types
* Site Tree settings, displayed as tabs when editing a single page
* Modal popup for extension settings