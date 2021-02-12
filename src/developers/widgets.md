# Widgets

<p class = "uk-article-lead"> Create components to create small pieces of content in different locations of your site. </p>

To determine where to create the content of a widget, the admin panel has a __components__ section to publish the widget at specific locations defined by the theme. Extensions and themes can come with components with no difference in development.

## Define Widget locations

You can define any number of widget locations in your theme's `index.php`.

```php
'positions' => [

    'sidebar' => 'Sidebar',
    'footer' => 'Footer',

],
```

## Rendering Components

To create anything published in a component location, you can use the view creator instance in your theme's `views/template.php` file.

```php
<?php if ($view->position()->exists('sidebar')) : ?>
    <?= $view->position('sidebar') ?>
<?php endif; ?>
```

## Save a new component type
To register a new component type, you can use the `widgets` feature in your `index.php` file.

```php
'widgets' => [

    'widgets/hellowidget.php'

],
```


## Define a new component type

`widgets/hellowidget.php`:
Internally, the component in Greencheap is a module. Therefore, a module is defined by its definition: A PHP array with a specific set of properties.

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

For this example, create the component on the front end of the following two files, requires a JavaScript file and a PHP file.

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
<p> Hello component output. </p>    
```

**Note** A good example for a complete component, Greencheap is located in the `app/system/modules/user/widgets/login.php` location in the grasshopper.