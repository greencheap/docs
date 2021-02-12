# Temalar

<p class="uk-article-lead">Bir tema sitenizin görünümünü değiştirir. En basit haliyle, bir tema, uzantılarınızın içerik çıktısı için çevreleyen HTML işaretlemesini oluşturur.</p>

**Not** Bu öğreticideki örnekler, Github'dd bulunan _Hello_ temasından alınmıştır. Yüklendiğinde, _Hello_ teması `/packages/greencheap/theme-hello` konumunda bulunur.

## Paket tanımı
Tema, `greencheap-theme` türünde düzenli bir Green Cheap paketidir. Her paketin Green Cheap tarafından tanınabilmesi için bir açıklamaya ihtiyacı vardır. Bu açıklama `composer.json` dosyasında bulunur ve aşağıdaki gibi görünür. Ayrıntılı bilgi için Paketler bölümüne bakın.

```json
{
    "name": "greencheap/theme-hello",
    "type": "greencheap-theme",
    "version": "0.9.0",
    "title": "Hello"
}
```

## Modül tanımı
Kendi içinde bir tema basitçe bir modüldür. Bu yüzden önce modülleri okumak isteyebilirsiniz. Bu, bir temanın neler yapabileceğiyle ilgili birçok olasılık açar.

Temanızın konumlarını ve menülerini tanımlayın, ek komut dosyaları yükleyin ve çok daha fazlasını yapın. Başlamak için `index.php` kısaltılmış örneği. Temaya özgü özelliklerin açıklamaları aşağıda verilmiştir.

```php

return [

    'name' => 'theme-hello',

    /**
     * Menü konumlarını tanımlayın.
     */
    'menus' => [

        'main' => 'Main',

    ],

    /**
     * Widget konumlarını tanımlayın.
     */
    'positions' => [

        'sidebar' => 'Sidebar',

    ]

];
```

Temanız, menüleri ve widget'ları oluşturacak konumları tanımlar. Gerçek oluşturma, aşağıda gösterildiği gibi `template.php` dosyasında gerçekleşir. Ancak temanızın daha önce bu konumları kaydetmesi gerekir. Bu, `menus` ve `positions` özelliğiyle olur. Bunlar, yönetici panelinde görüntülenen konum adı ve etiket dizilerini içerir.

### Menüler (Menus)
Temanızda, Green Cheap sisteminden menüleri istediğiniz kadar pozisyonda oluşturabilirsiniz. Bu pozisyonların Green Cheap tarafından bilinmesini sağlamak için, onları `menus` özelliğini kullanarak kaydettirmeniz gerekir.

Her menü konumu, bir tanımlayıcı (ör. `main`) ve kullanıcıya görüntülenecek bir etiket (ör. _Main_) ile tanımlanır.

```php
'menus' => [

    'main' => 'Main',
    'offcanvas' => 'Offcanvas'

],
```

### Pozisyonlar (Widgets)
Widget konumları, kullanıcıların tema işaretlemenizin çeşitli konumlarında widget yayınlamasına olanak tanır. Green Cheap yönetici panelinin _Widgets_ alanında görünürler ve bir widget oluştururken kullanıcı tarafından seçilebilirler.

Her bir pencere öğesi konumu, bir tanımlayıcı (yani `sidebar`) ve kullanıcıya görüntülenecek bir etiket (yani, _Sidebar_) ile tanımlanır.

```php
'positions' => [

    'sidebar' => 'Sidebar',

],
```

## Düzen Dosyası (Layout file)
Zorunlu modül dosyalarının yanı sıra, bir tema kendi `views/template.php` dosyasını getirir. Oluşturulmaya uygun aşağıdaki nesnelerle temanın biçimlendirmesi için ana dosyadır.

Obje      | Açıklama
--------- | ------------------------------
`$view`   | Oluşturucu örneğini görüntüleyin
`$params` | Tema parametreleri
`$app`    | Uygulama kapsayıcı örneği

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Her zaman sistemin baş bölümünü oluştur -->
        <?= $view->render('head') ?>

        <!-- Tema css ekle -->
        <?php $view->style('theme', 'theme:css/theme.css') ?>

        <!-- Tema JS'yi dahil et, jQuery'yi de içerecek -->
        <?php $view->script('theme', 'theme:js/theme.js', 'jquery') ?>
    </head>
    <body>

        <!-- URL ile birlikte sitenizin logosunu basın -->
        <?php if ($logo = $params['logo']) : ?>
        <a href="<?= $view->url()->get() ?>">
            <img src="<?= $this->escape($logo) ?>" alt="">
        </a>
        <?php endif ?>

        <!-- Menü pozisyonu -->
        <?php if ($view->menu()->exists('main')) : ?>
            <?= $view->menu('main') ?>
        <?php endif ?>

        <!-- Widget Pozisyonu -->
        <?php if ($view->position()->exists('sidebar')) : ?>
            <?= $view->position('sidebar') ?>
        <?php endif; ?>

        <!-- Sistem mesajları -->
        <?= $view->render('messages') ?>

        <!-- İçerik -->
        <?= $view->render('content') ?>

        <!-- Kapanış gövde etiketinin önüne kod ekleyin  -->
        <?= $view->render('footer') ?>

    </body>
</html>
```

## Menü ve Konum oluşturucu
Özel bir menü veya konum oluşturucu kullanmak isteyebilirsiniz. Aşağıda bunların nasıl kullanılacağına dair iki örnek bulacaksınız.

```php
<?= $view->menu('main', 'menu-navbar.php') ?>
```

Bu durumda, `ana` menü, `menu-navbar.php` düzen dosyasıyla oluşturulabilir.

```php
<ul class="uk-navbar-nav">

    <?php foreach ($root->getChildren() as $node) : ?>
    <li>

    <!-- ... daha fazla işaretleme ... -->

    </li>
    <?php endforeach ?>

</ul>
```

Aynısı widget konumları için de geçerlidir.

```php
<?= $view->position('hero', 'position-grid.php') ?>
```

Here, the widget position `hero` will be rendered with the `position-grid.php` layout file.
Burada, widget konumu `hero` , `position-grid.php` düzen dosyasıyla oluşturulabilir.

```php
<?php foreach ($widgets as $widget) : ?>
<div class="uk-width-1-<?= count($widgets) ?>">

    <div>

        <h3><?= $widget->title ?></h3>

        <?= $widget->get('result') ?>

    </div>

</div>
<?php endforeach ?>
```

## Varsayılan Green Cheap Biçimlendirme
Green Cheap yönetici paneli, UIkit ön uç çerçevesi kullanılarak oluşturulmuştur. Bu nedenle, statik sayfalar ve blog gibi Green Cheap çekirdek uzantıları, UIkit'ten CSS sınıfları ile işaretleme çıktılar. Bununla birlikte, kendi temalarınızı oluşturmak için hiçbir şekilde UIkit kullanmak zorunda değilsiniz.

Green Cheap sistem çıktısını biçimlendirmek için, tüm UIkit CSS'sini dahil etmek yerine birkaç sınıf için CSS ekleyebilirsiniz. `Hello` uzantısıyla gelen `theme.css` dosyası gerekli sınıfları zaten içeriyor.

Green Cheap'in kendi ürettiği işaretlemeyi tamamen değiştirmek isterseniz, sistem görünümü dosyalarının üzerine yazma olanağınız da vardır.

## Sistem görünümlerinin üzerine yaz
Sistem görünümü dosyalarının üzerine yazmak için, aşağıdaki tabloda gösterildiği gibi orijinal yapıyı taklit etmek ve şablon dosyalarını oraya koymak için temanızın içinde karşılık gelen klasörler oluşturmanız yeterlidir.

Dosya                        | Orjinal Dosya                               | Açıklama
---------------------------- | ------------------------------------------- | ------------------------
`views/system/site/page.php` | `/app/system/site/views/page.php`           | Varsayılan statik görünüm
`views/blog/post.php`        | `/packages/greencheap/blog/views/post.php`  | Varsayılan blog post görünüm
`views/blog/posts.php`       | `/packages/greencheap/blog/views/posts.php` | Varsayılan blog list görünüm

Bu görünümlerde hangi değişkenlerin mevcut olduğunu anlamak için orijinal görünüm dosyasındaki işaretlemeye bakın.

## Site arayüzüne tema seçenekleri ekleyin
Bu, JavaScript aracılığıyla, en rahat şekilde Vue bileşenlerini kullandığınızda yapılır.

Site Ağacı arayüzü şu anda etkin olduğunda kendi JS'nizi yükleyin. `index.php`inizde, doğru olayı dinlediğinizde bunu yapabilirsiniz.

```
'events' => [

    'view.system/site/admin/settings' => function ($event, $view) use ($app) {
        $view->script('site-theme', 'theme:js/site-theme.js', 'site-settings');
        $view->data('$theme', $this);
    },

    // ...

],
```

`js/site-theme.js`, arayüzü oluşturan ve tema ayarlarının depolanmasını sağlayan bir Vue bileşeni içerir.

**Not** Tüm bunları tek bir JS dosyasında yapmak ve işaretlemeyi bir dizede göstermek mümkün olsa da, en iyi uygulama aslında Vue bileşeninizle `*.vue` dosyaları oluşturmaktır. Örnekler, varsayılan _One_ temasının `app/components` klasöründe bulunabilir.

```js
window.Site.components['site-theme'] = {

    section: {
        label: 'Theme',
        icon: 'pk-icon-large-brush',
        priority: 15
    },

    template: '<div>Your form markup here</div>',

    data: function () {
        return window.$theme;
    },

    events: {

        save: function() {

            var config = _.omit(this.config, ['positions', 'menus', 'widget']);

            this.$http.post('admin/system/settings/config', {name: this.name, config: config}).error(function (data) {
                this.$notify(data, 'danger');
            });

        }

    }

};
```

## Site Ağacında Düğüm yapılandırmasına bir Tema sekmesi ekleyin
Genellikle Site ağacındaki belirli bir Düğüme tema seçenekleri eklemek istersiniz. Örneğin, kullanıcının her sayfada farklı olabilen bir Çarpıcı resim seçmesine izin vermek istiyorsunuz. Bunu yapmak için Site arayüzüne bir _Theme_ sekmesi ekleyebiliriz.

```php
'events' => [

    // ...

    'view.system/site/admin/edit' => function ($event, $view) {
        $view->script('node-theme', 'theme:js/node-theme.js', 'site-edit');
    },

    // ...
];
```

Örnek `js/node-theme.js`:

```js
window.Site.components['node-theme'] = {

    section: {
        label: 'Theme',
        priority: 90
    },

    props: ['node'],

    template: '<div>Your form markup here</div>'

};
```

**Not** Varsayılan _One_ temasının `app/components` klasöründeki tam Vue bileşenleriyle karşılaştırın.

## Widget arayüzüne tema seçenekleri ekleyin
_Widget_ düzenleme görünümünde yüklenecek bir komut dosyası kaydedin.

```
'view.system/widget/edit' => function ($event, $view) {
    $view->script('widget-theme', 'theme:app/bundle/widget-theme.js', 'widget-edit');
},
```

Örnek `widget-theme.js`:

```js
window.Widgets.components['widget-theme'] = {

    section: {
        label: 'Theme',
        priority: 90
    },

    props: ['widget', 'config'],

    template: '<div>Your form markup here</div>'

};
```

**Not** Varsayılan _One_ temasının `app/components` klasöründeki tam Vue bileşenleriyle karşılaştırın.
