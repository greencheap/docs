# Themes
<p class="uk-article-lead">A theme changes the appearance of your site. In its simplest form, a theme, creates surrounding HTML markup for the content output of your extensions.</p>

**Note** Examples in this tutorial, Taken from the _Hello_ theme available on GitHub. When installed, _Hello_ theme is located in '/packages/greencheap/theme-hello'.

## package description
Theme, `greencheap-theme' is a regular green Cheap package. Each package needs an explanation to be recognized by Green Cheap. This description is in the `composer.json` file and looks like the following. See packages for details.

```json
{
    "name": "greencheap/theme-hello",
    "type": "greencheap-theme",
    "version": "0.9.0",
    "title": "Hello"
}
```

## Module definition
A theme in itself is simply a module. So you may want to read the modules first. This opens up many possibilities about what a theme can do.

Define your theme's locations and menus, install additional scripts and much more. Abbreviated example of `index.php` to begin with. Descriptions of theme-specific features are given below.

```php

return [

    'name' => 'theme-hello',

    /**
     * Define menu locations.
     */
    'menus' => [

        'main' => 'Main',

    ],

    /**
     * Define Widget locations.
     */
    'positions' => [

        'sidebar' => 'Sidebar',

    ]

];
```

Defines the locations that will create your theme, menus, and widgets. Actual creation takes place in the `template.php` file, as shown below. However, your theme needs to save these locations earlier. This happens with the `menus` and `positions` feature. These include the location name and tag sequences that appear in the admin panel.

### Menus
In your theme, From the Green Cheap system, you can create menus in as many positions as you want. To ensure that these positions are known to Green Cheap, you must register them using the `menu` feature.

Each menu location, an identifier (ex. 'main') and a tag to be displayed to the user (ex. _Main_) is defined by.

```php
'menus' => [

    'main' => 'Main',
    'offcanvas' => 'Offcanvas'

],
```

### Positions (Widgets)
Widget locations allow users to publish widgets at various locations of your theme markup. They appear in the _widgets_ area of the green Cheap admin panel and can be selected by the user when creating a widget.

Location of each widget, it is identified by an identifier (i.e. `sidebar`) and a tag (i.e. _Sidebar_) to display to the user.

```php
'positions' => [

    'sidebar' => 'Sidebar',

],
```

## Layout file
As well as mandatory module files, own a theme 'views/template.fetches php' file. Is the main file for formatting the theme with the following objects suitable for creation.

Object    | Description
--------- | ------------------------------
`$view`   | View the builder instance
`$params` | Theme parameters
`$app`    | Application Container Instance

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Always create the head part of the system -->
        <?= $view->render('head') ?>

        <!-- Add css theme -->
        <?php $view->style('theme', 'theme:css/theme.css') ?>

        <!-- Theme include js, including jQuery -->
        <?php $view->script('theme', 'theme:js/theme.js', 'jquery') ?>
    </head>
    <body>

        <!-- Click your site's logo along with the URL -->
        <?php if ($logo = $params['logo']) : ?>
        <a href="<?= $view->url()->get() ?>">
            <img src="<?= $this->escape($logo) ?>" alt="">
        </a>
        <?php endif ?>

        <!-- Menu position -->
        <?php if ($view->menu()->exists('main')) : ?>
            <?= $view->menu('main') ?>
        <?php endif ?>

        <!-- Widget position -->
        <?php if ($view->position()->exists('sidebar')) : ?>
            <?= $view->position('sidebar') ?>
        <?php endif; ?>

        <!-- System message -->
        <?= $view->render('messages') ?>

        <!-- content -->
        <?= $view->render('content') ?>

        <!-- Add code before the closing body tag  -->
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

## Default Green Cheap Formatting
The Green Cheap admin panel is built using the UIKit front end frame. Therefore, green Cheap core extensions like static pages and blog, Markup outputs from UIKit with CSS classes. However, you don't need to use UIKit in any way to create your own themes.

Green Cheap to format system output, you can add CSS for several classes instead of including the entire UIKit CSS. `Hello` that comes with the extension `theme.css` file already contains required classes.

If you want to completely change Green cheap's self-produced marking, you also have the ability to overwrite system view files.

## Overwrite system views
To overwrite system view files, just create corresponding folders within your theme to emulate the original structure and put the template files there, as shown in the table below.

File                         | Orginal File                                | Description
---------------------------- | ------------------------------------------- | ------------------------
`views/system/site/page.php` | `/app/system/site/views/page.php`           | Default static view
`views/blog/post.php`        | `/packages/greencheap/blog/views/post.php`  | Default blog post view
`views/blog/posts.php`       | `/packages/greencheap/blog/views/posts.php` | Default list post view

To understand which variables are present in these views, see the markup in the original view file.

## Add theme options to the Site interface
This is done through JavaScript, most conveniently when you use Vue components.

Install your own JS when the Site Tree interface is currently active. in your `index-php`, you can do this when you listen to the correct event.

```
'events' => [

    'view.system/site/admin/settings' => function ($event, $view) use ($app) {
        $view->script('site-theme', 'theme:js/site-theme.js', 'site-settings');
        $view->data('$theme', $this);
    },

    // ...

],
```

`js/site-theme.js` includes a Vue component that creates the interface and allows the storage of Theme Settings.

**Note** Although it is possible to do all this in a single JS file and show the markup in a string, best practice is actually with your Vue component '*.Vue' is to create files. Examples can be found in the` app/components ' folder of the default _One_ theme.

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

## Add a Theme tab to the node configuration in the Site Tree
You usually want to add theme options to a specific node in the Site tree. For example, you want to let the user choose one stunning image that can be different on each page. To do this, we can add a _theme_ tab to the Site interface.

```php
'events' => [

    // ...

    'view.system/site/admin/edit' => function ($event, $view) {
        $view->script('node-theme', 'theme:js/node-theme.js', 'site-edit');
    },

    // ...
];
```

Example `js/node-theme.js`:

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

**Note** Compare with the full Vue components in the `app/components` folder of the default _One_ theme.

## Add theme options to the Widget interface
_widget_ save a script to load in Edit view.

```
'view.system/widget/edit' => function ($event, $view) {
    $view->script('widget-theme', 'theme:app/bundle/widget-theme.js', 'widget-edit');
},
```

Example `widget-theme.js`:

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
