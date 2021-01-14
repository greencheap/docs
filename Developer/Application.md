<p class="uk-article-lead">*Application*, Functions as greencheap's dependency container. Application, Greencheap's functionality and services can be configured throughout the `modules page`, expandable, makes it interchangeable and accessible.</p>

All services available at Green cheap, In the `application` instance, dependency is set as injected properties. For example `$app['db']` allows you to access the database service.

## Access to a service

There are basically two ways to access the `application` instance. Depending on the context you are currently in, you can access a `$app` variable or a `GreenCheap\Application` class via a static call.

```php
// Getter
$app['cache']

use GreenCheap\Application as App;
App::cache();
```

As you can see, implements a magic `__call` method as well as `\ArrayAccess` to access container services.

## Service Identification
Adding a service to the application, it can be easily accomplished by setting an array switch on the container to be a shutdown. This is not evaluated until it is accessed for the first time.

```php
$app['cache'] = function () {
    return new Cache();
};
```
