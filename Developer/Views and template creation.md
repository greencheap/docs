<p class="uk-article-lead">
When the controller receives an incoming request, view is responsible for giving the response. It uses a stencil engine to achieve this. In greencheap, you can use flat PHP templates or The Twig template creation engine.</p>

## Generated display response

The most common way to create a view, the controller is to return an array from your action. Use the `$view` property to pass parameters to your view builder.

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

The generated View File may look like this:

```php
<!-- packages/greencheap/extension-hello/views/index.php -->

<h1>Hello <?= $name ?></h1>
<p>
   ...
</p>
```

This view is wrapped in the main layout by default. To prevent this behavior, you can change the value  `'layout => false`in the string `$view`.

## Create a view manually

You can also access the `View` service manually to create a template file. If you dynamically specify which view to load, this can be useful. In the following example, the expression `hello:`, note that the package refers to the resource abbreviation as defined.

```php

use GreenCheap\Application as App;

class MyController {

    public function anotherViewAction()
    {
        return App::view()->render('hello:views/view.php', ['id' => 1]);
    }

}
```

Appropriate view file:

```HTML
<!-- packages/greencheap/extension-hello/views/index.php -->

<h1>You are viewing the article number <?= $id ?></h1>
<p>
   ...
</p>
```

## Templates
Views, it is created using the PHP template creation engine, which offers defined generic template variables and a set of appearance assistants.

### Other appearances included

Creating sub-views from your view is done with the `$view` helper. `Render` method, evaluates and returns the contents of the given template file. It's the same as manually creating the view from the controller.
```php
$view->render('hello:views/view.php', ['id' => 1])
```

### Connection to routes

As seen previously, of each route, has a name that you can use to dynamically create links to a specific route. There is a `Url` helper that exposes `UrlProvider` functions.

```HTML
<a href="<?= $view->url('@hello/default/view') ?>">View all articles</a>
<a href="<?= $view->url('@hello/default/view', ['id' => 23]) ?>">View article 23</a>
```

You can link to entities such as images or other files using the Url provider's `getStatic($path)` method.

```HTML
<img src="<?= $view->url()->getStatic('hello:extension.svg') ?>" alt="Extension icon" />
```

## Working With Assets

Assets, CSS, including JS and image files are static files needed in your project.

### Create URL of static assets

Use the `Getstatic` method of the `UrlProvider` class to create a path to a static entity.

```php
<img src="<?= $view->url()->getStatic('my-assets/image.jpg') ?>">
```

### Add CSS to the view file

To add a CSS file to your view, call `style` assistant from `$view`.

```php
$view->style($id, $path [, $dependencies ])
```

Two parameters,  is a unique identifier for the style sheet. If you use the same identifier for multiple style sheets, GreenCheap will contain only the last one. Two parameters, `theme:` is the path of the style sheet that you can use `theme` as a reference to the root directory of the package. You can define dependencies with the optional third parameter.

Örnek:
```
<?php $view->style('theme', 'theme:css/theme.css') ?>
<?php $view->style('theme', 'theme:css/theme.css', 'uikit') ?>
<?php $view->style('theme', 'theme:css/theme.css', ['uikit', 'somethingelse']) ?>
```

**Note** This does not directly extract the required line as HTML. Instead of, adds CSS file to GreenCheap Asset manager. Still page, it will be included in the `<head>` section of your theme.

### Include js in view file

To add a JavaScript file to your template, call the `script` assistant from the `$view` object, which works exactly like the `sytle` assistant.

```php
$view->script($id, $path [, $dependencies ])
```

Two parameters, is a unique identifier for the script entity. If you use the same identifier for multiple scripts, GreenCheap will contain only the last one. Two parameters, `theme:` is the path of the style sheet that you can use `theme` as a reference to the root directory of the package. You can define dependencies with the optional third parameter.

Example:

```
<?php $view->script('theme', 'theme:js/theme.js') ?>
<?php $view->script('theme', 'theme:js/theme.js', 'jquery') ?>
<?php $view->script('theme', 'theme:js/theme.js', ['jquery', 'uikit']) ?>
```

**Note** Internally, 'style()` and `script()' each work with their own asset manager. Because they're separate, you can assign the same name to a CSS and JS file without conflict (in the example above, both are called `themes`). But, two scripts or style sheets cannot have the same identifier. For example, when adding two style sheets, one can be called 'Theme' and the other 'special'.

### Asynchronous and deferred script execution

By default, a script located in the head section of the processed HML markup is immediately fetched and executed. After that, however, the browser continues to parse the page.

To change this behavior, you can use the keywords `async` and `defer` when loading a script. PHP kodunuzda uygun seçeneği ayarlayın ve sonuçta ortaya çıkan `<script>` etiketi bu öznitelikleri uygun şekilde ayarlayacaktır.

Attribute | Description
--------- | -----------
`async` | Tell the browser to execute the script asynchronously; this means that parsing the page will continue even when the script is executed.
`defer` | Browser, say the script must be executed after the document is parsed. Browser support for this HTML feature is not perfect, however, using it can only cause problems when the execution order of scripts is important.

Example: Deferred execution, no addiction.
```
<?php $view->script('theme', 'theme:js/theme.js', [], ['defer' => true]) ?>
```

Example: Deferred and asynchronous execution with dependencies.

```
<?php $view->script('theme', 'theme:js/theme.js', ['jquery', 'uikit'], ['defer' => true, 'async' => true]) ?>
```

## Twig templates

Instead of using flat PHP for template creation, you can also use twig for your theme and extension templates. You can find documents related to [Twig syntax and features](http://twig.sensiolabs.org/doc/templates.html). Similar to the official Hello theme for the default PHP template, a [boilerplate Twig theme](https://github.com/florianletsch/theme-twig) is also available and can be used as a starting point.