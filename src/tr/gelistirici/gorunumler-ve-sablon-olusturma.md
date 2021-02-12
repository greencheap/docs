# Görünümler ve Şablon Oluşturma

<p class="uk-article-lead">
Denetleyici gelen talebi ele alırken, yanıtı vermekten görünüm sorumludur. Bunu başarmak için bir şablonlama motoru kullanır. GreenCheap'te düz PHP şablonlarını veya Twig şablon oluşturma motorunu kullanabilirsiniz.</p>

## Oluşturulan görüntüleme yanıtı

Bir görünümü oluşturmanın en yaygın yolu, denetleyici eyleminizden bir dizi döndürmektir. Görünüm oluşturucunuza parametreleri iletmek için `$view` özelliğini kullanın.

```php
public function indexAction($name = '')
{
    return [
        '$view' => [

            // Rendered in the site's <title>
            'title' => 'Hello World',

            // view file that is rendered
            'name' => 'hello:views/index.php',
        ],

        // pass parameters to view file
        'name' => $name
    ];
}
```

Oluşturulan görünüm dosyası şöyle görünebilir:

```php
<!-- packages/greencheap/extension-hello/views/index.php -->

<h1>Hello <?= $name ?></h1>
<p>
   ...
</p>
```

Bu görünüm varsayılan olarak ana düzende sarılmıştır. Bu davranışı önlemek için, `$view` dizisindeki `'layout' => false` değerini değiştirebilirsiniz.

## Manuel olarak bir görünüm oluşturun

Bir şablon dosyası oluşturmak için `View` hizmetine manuel olarak da erişebilirsiniz. Hangi görünümün yükleneceğini dinamik olarak belirlerseniz, bu kullanışlı olabilir. Aşağıdaki örnekte `hello:` ifadesinin, paketin tanımlandığı gibi kaynak kısaltmasına atıfta bulunduğuna dikkat edin.

```php

use GreenCheap\Application as App;

class MyController {

    public function anotherViewAction()
    {
        return App::view()->render('hello:views/view.php', ['id' => 1]);
    }

}
```

Uygun görünüm dosyası:

```HTML
<!-- packages/greencheap/extension-hello/views/index.php -->

<h1>Makale numarasını görüntülüyorsunuz <?= $id ?></h1>
<p>
   ...
</p>
```

## Şablon
Görünümler, tanımlanmış genel şablon değişkenleri ve bir dizi görünüm yardımcısı sunan PHP şablon oluşturma motoru kullanılarak oluşturulur.

### Diğer görünümler dahil

Görünümünüzden alt görünümlerin oluşturulması `$view` yardımcısıyla yapılır. `Render` yöntemi, verilen şablon dosyasının içeriğini değerlendirir ve döndürür. Bu, görünümü denetleyiciden manuel olarak oluşturmakla aynıdır.
```php
$view->render('hello:views/view.php', ['id' => 1])
```

### Rotalara bağlantı

Daha önce görüldüğü gibi, her rotanın, belirli rotaya dinamik olarak bağlantılar oluşturmak için kullanabileceğiniz bir adı vardır. `UrlProvider` işlevlerini ortaya çıkaran bir `Url` yardımcısı vardır.

```HTML
<a href="<?= $view->url('@hello/default/view') ?>">View all articles</a>
<a href="<?= $view->url('@hello/default/view', ['id' => 23]) ?>">View article 23</a>
```

URL sağlayıcısının `getStatic($path)` yöntemini kullanarak resimler veya diğer dosyalar gibi varlıklara bağlantı verebilirsiniz.

```HTML
<img src="<?= $view->url()->getStatic('hello:extension.svg') ?>" alt="Extension icon" />
```

## Varlıklarla Çalışma

Varlıklar, CSS, JS ve görüntü dosyaları dahil projenizde ihtiyaç duyulan statik dosyalardır.

### Statik varlıkların URL'sini oluşturun

Statik bir varlığa bir yol oluşturmak için `UrlProvider` sınıfının `getStatic` yöntemini kullanın.

```php
<img src="<?= $view->url()->getStatic('my-assets/image.jpg') ?>">
```

### Görünüm dosyasına CSS ekle

Görünümünüze bir CSS dosyası eklemek için, `$view` den `style` yardımcısını çağırın.

```php
$view->style($id, $path [, $dependencies ])
```

İlk parametre, stil sayfası için benzersiz bir tanımlayıcıdır. Birden çok stil sayfası için aynı tanımlayıcıyı kullanırsanız, GreenCheap yalnızca sonuncuyu içerecektir. İkinci parametre, `theme:` paketinin kök dizinine referans olarak `theme` kullanabileceğiniz stil sayfasının yoludur. Bağımlılıklarını isteğe bağlı üçüncü parametre ile tanımlayabilirsiniz.

Örnek:
```
<?php $view->style('theme', 'theme:css/theme.css') ?>
<?php $view->style('theme', 'theme:css/theme.css', 'uikit') ?>
<?php $view->style('theme', 'theme:css/theme.css', ['uikit', 'somethingelse']) ?>
```

**Not** Bu, gerekli satırı doğrudan HTML olarak çıkarmaz. Bunun yerine, CSS dosyasını GreenCheap Asset Manager'a ekler. Stil sayfası, temanızın `<head>` bölümüne dahil edilecektir.

### JS'yi görünüm dosyasına dahil et

Şablonunuza bir JavaScript dosyası eklemek için, tam olarak `style` yardımcısı gibi çalışan `$view` nesnesinden `script` yardımcısını çağırın.

```php
$view->script($id, $path [, $dependencies ])
```

İlk parametre, komut dosyası varlığı için benzersiz bir tanımlayıcıdır. Birden çok komut dosyası için aynı tanımlayıcıyı kullanırsanız, GreenCheap yalnızca sonuncuyu içerecektir. İkinci parametre, `theme` paketinin kök dizinine referans olarak `theme:` kullanabileceğiniz komut dosyasının yoludur. Bağımlılıklarını isteğe bağlı üçüncü parametre ile tanımlayabilirsiniz.

Example:
Örnek:

```
<?php $view->script('theme', 'theme:js/theme.js') ?>
<?php $view->script('theme', 'theme:js/theme.js', 'jquery') ?>
<?php $view->script('theme', 'theme:js/theme.js', ['jquery', 'uikit']) ?>
```

**Not** Dahili olarak, `style()` ve `script()` öğelerinin her biri kendi Varlık Yöneticisiyle çalışır. Bunlar birbirinden ayrı olduğundan, aynı adı bir CSS ve JS dosyasına çakışma olmadan atayabilirsiniz (yukarıdaki örnekte her ikisi de `theme` olarak adlandırılır). Ancak, iki komut dosyası veya stil sayfası aynı tanımlayıcıya sahip olamaz. Örneğin, iki stil sayfası eklerken, biri 'tema' ve diğeri 'özel' olarak adlandırılabilir.

### Eşzamansız ve ertelenmiş komut dosyası yürütme

Varsayılan olarak, işlenen HML işaretlemesinin head bölümünde bulunan bir komut dosyası hemen getirilir ve yürütülür. Ancak bundan sonra tarayıcı sayfayı ayrıştırmaya devam eder.

Bu davranışı değiştirmek için, bir komut dosyasını yüklerken `async` ve `defer` anahtar kelimelerini kullanabilirsiniz. PHP kodunuzda uygun seçeneği ayarlayın ve sonuçta ortaya çıkan `<script>` etiketi bu öznitelikleri uygun şekilde ayarlayacaktır.

Öznitelik | Açıklama
--------- | -----------
`async` | Tarayıcıya komut dosyasını eşzamansız olarak yürütmesini söyleyin; bu, komut dosyası yürütülürken bile sayfanın ayrıştırılmasının devam edeceği anlamına gelir.
`defer` | Tarayıcıya, betiğin belge ayrıştırıldıktan sonra yürütülmesi gerektiğini söyleyin. Bu HTML özelliğinin tarayıcı desteği mükemmel değildir, ancak onu kullanmak yalnızca komut dosyalarının yürütme sırasının önemli olduğu durumlarda sorunlara neden olabilir.

Örnek: Ertelenmiş yürütme, bağımlılık yok.
```
<?php $view->script('theme', 'theme:js/theme.js', [], ['defer' => true]) ?>
```

Örnek: Bağımlılıkları olan ertelenmiş ve eşzamansız yürütme.

```
<?php $view->script('theme', 'theme:js/theme.js', ['jquery', 'uikit'], ['defer' => true, 'async' => true]) ?>
```

## Twig şablonları

Şablon oluşturma için düz PHP kullanmak yerine, tema ve uzantı şablonlarınız için Twig'i de kullanabilirsiniz. Resmi Twig dokümanlarında temel [Twig syntax and features](http://twig.sensiolabs.org/doc/templates.html) ile ilgili dokümanları bulabilirsiniz. Varsayılan PHP şablonu için resmi Merhaba temasına benzer şekilde, bir [boilerplate Twig theme](https://github.com/florianletsch/theme-twig) de mevcuttur ve bir başlangıç noktası olarak kullanılabilir.