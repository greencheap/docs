<p class = "uk-article-lead"> Sitenizin farklı konumlarında küçük içerik parçaları oluşturmak için Bileşen'ler oluşturun. </p>

Bir pencere öğesinin içeriğinin nerede oluşturulacağını belirlemek için, yönetici panelinde, temayla tanımlanan belirli konumlarda pencere öğesi yayınlamak için bir _Bileşenler_ bölümü vardır. Uzantılar ve temalar, geliştirmede hiçbir fark olmaksızın bileşen'lerle birlikte gelebilir.

## Widget konumlarını tanımlayın

Temanızın `index.php`sinde istediğiniz sayıda widget konumu tanımlayabilirsiniz.

```php
'positions' => [

    'sidebar' => 'Sidebar',
    'footer' => 'Footer',

],
```

## Render Bileşenler

Bir bileşen konumunda yayınlanan herhangi bir şeyi oluşturmak için, temanızın `views/template.php` dosyasında bulunan View oluşturucu örneğini kullanabilirsiniz.

```php
<?php if ($view->position()->exists('sidebar')) : ?>
    <?= $view->position('sidebar') ?>
<?php endif; ?>
```

## Yeni bir bileşen türü kaydedin
Yeni bir bileşen türü kaydetmek için, `index.php` dosyanızdaki `widgets` özelliğini kullanabilirsiniz.

```php
'widgets' => [

    'widgets/hellowidget.php'

],
```


## Yeni bir bileşen türü tanımlayın

`widgets/hellowidget.php`:
Dahili olarak, GreenCheap'teki bileşen bir modüldür. Bu nedenle, bir modül tanımıyla tanımlanır: Belirli bir özellik kümesine sahip bir PHP dizisi.

`widgets/hellowidget.php`:

```php
<?php

return [

    'name' => 'hello/hellowidget',

    'label' => 'Hello Widget',

    'events' => [

        'view.scripts' => function ($event, $scripts) use ($app) {
            $scripts->register('widget-hellowidget', 'hello:js/widget.js', ['~widgets']);
        }

    ],

    'render' => function ($widget) use ($app) {

        // ...

        return $app->view('hello/widget.php');
    }

];
```

Bu örnek, bileşen'i ön uçta oluşturmak için aşağıdaki iki dosyayı, bir JavaScript dosyasını ve bir PHP dosyasını gerektirir.

`Js / widget.js`:

```javascript
window.Widgets.components['system-login:settings'] = {

    section: {
        label: 'Settings'
    },

    template: '<div>Your form markup here</div>',

    props: ['widget', 'config', 'form']

};
```

`views/widget.php`:

```php
<p> Merhaba Bileşen çıktısı. </p>    
```

**Not** Tam bir Bileşen için iyi bir örnek, GreenCheap çekirdeğindeki `app/system/modules/user/widgets/login.php` konumunda bulunur.
