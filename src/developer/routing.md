# Routing
<p class="uk-article-lead">A central task solved by Green Cheap is _routing_. When the browser hits a URL, framework, determines which process to call.</p>

## Controls
The most common way to create a route in greencheap is to define a _controller_. A controller handles requests, responsible for setting routes and creating views.

### Save a controls
You can save a controller inside your module configuration. Use the `routes` feature to mount controllers to a route.

```php
'routes' => [

    '/hello' => [
        'name' => '@hello/admin',
        'controller' => [
            'GreenCheap\\Hello\\Controller\\HelloController'
        ]
    ]

],
```

### Simple structure
Class, `@Route ("/hello")` `is described by and http://example.com/hello/` causes the address to be _mounted_. This, means that it will respond to all requests to that URL and sub-URLs such as `http//example.com/hello/settings`.

```php
namespace GreenCheap\Hello\Controller;

/**
 * @Route("/hello")
 */
class HelloController
{

    public function indexAction()
    {
        // ...
    }

    public function settingsAction()
    {
        // ...
    }
}
```

By default, your extension (or theme) boots and a set of default routes is automatically created. You can use the Developer Toolbar to view New saved routes (along with all basic routes).

Here's how to figure out the route:

Route | Example | Annotation
------|------------------|---------------------------------------------------
Name  |`@hello/hello/settings`| The name of the route can be used to generate URLs (must be unique).
URI   |`/hello/settings`| The way to access this route in the browser.
Action|`GreenCheap\Hello\Controller\DefaultController::settingsAction`| Controller action to be called.

By default, roads `http://example.com/<extension>/<controller>/<action>` will be in the format. A special action, `.../index` not, `... / `indexAction` to be mounted on. Advanced options for custom routes, as you will see in the following sections, of course it is available.

**Note** If a route is not unique in your application, the route that was first added is used. Because this is the internal behavior of the framework that may change, he must not trust it, make sure your routes are unique.

## Annotations
Most of the behavior of the controller is determined by information and methods attached to the class. Quick overview, below is a detailed description for each annotation.

Annotation | Annotation
---------- | -------------------------------------------------------------
`@Route`   | Bir eylemi veya tüm denetleyiciyi bağlama yolu.
`@Request` | Http isteğinden yönteme geçen parametreler.
`@Access`  | Kullanıcı izinlerini kontrol edin.

**Note** Annotations work only if you start a multiline comment with two stars, not just one star.

```
// not run:
/* @Route("/hello") */

// will run:
/** @Route("/hello") */

// will run:
/**
 * @Route("/hello")
 */
```

### @Route
Define the path to which the controller (or controller action) will be mounted. Class and method definitions can be explained.

By default, a method called ' greetAction`, connects to the bottom of the class route as `/greet`. To add custom paths, you can add any number of additional paths to a method. Routes, it can also include dynamic parameters to be passed to the method.

```php
/**
 * @Route("/greet", name="@hello/greet/world")
 * @Route("/greet/{name}", name="@hello/greet/name")
 */
public function greetAction($name = 'World')
{
    // ...
}
```

Parameters can be specified to meet certain requirements (for example, limit the value to numbers). You can name a route so that you can refer to your code. To make a parameter optional, use the PHP argument defaults in the method definition.

Routes can be linked to certain HTTP methods (e.g. 'GET` or`POST'). This is especially useful for RESTful APIs.

```php
/**
 * @Route("/view/{id}", name="@hello/view/id", requirements={"id"="\d+"}, methods="GET")
 */
public function viewAction($id = 0)
{
    // ...
}
```

**Note** See [Symfony'nin kendi belgelerine](http://symfony.com/doc/current/bundles/SensioFrameworkExtraBundle/annotations/routing.html) in the` @Route ' description for details and more examples

### @Request
You can specify the types of data transmitted over a request and match the parameters passed to the annotation method.

Matches array from _name_ to _type_. _name_ is the key inside the request data. _type_, an integer array for `int',`string`, advanced types such as` array ` and` int [] ' can be. Any type if not specified, thought of as 'string' by default.

Order of the keys, defines the order in which parameters are passed to the method. The parameter name in the method head can be anything.

```php
/**
 * @Request({"id": "int", "title", "config": "array"}, csrf=true)
 */
public function saveAction($id, $title, $config)
{
  // ...
}
```

Also, you can also check for an icon to protect against [CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery). Add `csrf=true` to your request annotations and add the call `@token` to the view that sends a form to this method.

See 'GreenCheap\Filter\FilterManager' for a complete list of available filters. Some filters have additional options, such as `pregreplace`.

```php
/**
 * @Request({"folders":"pregreplace[]"}, options={"folders" = {"pattern":"/[^a-z0-9_-]/i"}})
 */
public function deleteFolders($folders)
{
  // ...
}
```

### @Access
You can specify specific user permissions to access a specific method or the entire controller.

Controllers should always be specific to the frontend or the admin panel. So far, we have seen controllers for the frontend. An administration controller will only be accessible for users with the `Access admin area` permission. Also, all routes for that controller will have a leading `admin/` in the URL. As a result, views will also render in the admin layout and not in the default theme layout.


```php
/**
 * @Access(admin=true)
 */
class SettingsController
{
  // ...
}
```

Only users with the _Access admin area_ permission can now access controller actions. If you want to use more restrictions and allow only certain users to perform certain operations (manage users, etc.), You can add restrictions to single controller actions.

Define permissions in the `extension.php` (or `theme.php`) file and combine them however you want. Access restrictions from the controller level will be combined with access restrictions on the single actions. Therefore you can set a basic _minimum_ access level for your controller and limit certain actions, like administrative actions, to users with more specific permissions.


```php
/**
  * @Access("hello: manage users")
  */
  public function saveAction()
  {
    // ...
  }
```

Of course, you can use these restrictions even if the controller is not an administrator domain controller. You can also control administrator permissions for single controller actions.

```php
/**
  * @Access("hello: edit article", admin=true)
  */
  public function editAction()
  {
    // ...
  }
```

## Creating URL
You can create URLs for your routes using the URL service.

```php
$this['url']->route('@hello/default/index')          // '/hello/default/index'
$this['url']->route('@hello/default/index', true)    // 'http://example.com/hello/default/index'
$this['url']->route('@hello/view/id', ['id' => 23])  // '/hello/view/23'
or
App::url('@hello/default/index')          // '/hello/default/index'
App::url('@hello/default/index', true)    // 'http://example.com/hello/default/index'
App::url('@hello/view/id', ['id' => 23])  // '/hello/view/23'
```

## Links

Greencheap's routes can be defined by an internal route syntax. These are optionally GET parameters (for example, '@hello / name?name= World') followed by the path name (Ex. '@hello/name') occurs. It's called a connection. Separates the actual route Uri from the route itself.