# Response
<p class="uk-article-lead">The response represents the server'S HTTP response to the client. There are several different types listed below, each with an example of how the response from the controller action is generated.</p>

## String
Use the `response` service to return a simple string response.

```php
public function indexAction()
{
    return $this['response']->create('My content');
}
```

## Created View

Greencheap can create a view and send the response back for you. simply return an array with the `$view` key set to an array containing the _title_ and _name_ view.

All other parameters in the array are accessible from view. Learn more about views and templates.

```php
public function indexAction($name = '')
{
    return [
        '$view' => [
            'title' => 'Hello World',
            'name' => 'hello:views/index.php',
        ],
        'name' => $name
    ];
}
```

If you don't want this to be a themed response, as described below, set `$view' to `layout' = > false`.

## Themed
A themed response embeds the result of the controller into a surrounding layout, usually defined by the theme. Simply return a string from the controller.

```php
public function indexAction()
{
    return 'My content';
}
```

## JSON
There are two ways to return a JSON response from the controller:

If the action returns an array or an object that implements `\jsonserializable`, a ' JsonResponse` is automatically generated.

```php
public function jsonAction()
{
    return ['error' => true, 'message' => 'There is nothing here. Move along.'];
}
```

Of course, the `response` service can be used to achieve the same.

```php
public function jsonAction()
{    
    return $this['response']->json(['error' => true, 'message' => 'There is nothing here. Move along.']);
}
```

## orientation
Use a redirect response to redirect the user.

```php
public function redirectAction()
{
    return $this['response']->redirect('@hello/greet/name', ['name' => 'Someone']);
}
```

## Custom response and error pagesreturn any custom HTTP response using the `create` command.

```php
public function forbiddenAction()
{
    return $this['response']->create('Permission denied.', 401);
}
```

## Stream
Stream response allows content to be transferred to the client. Takes a callback function as the first argument. Within this callback, a `flush` call is sent directly to the customer.

```php
public function streamAction()
{
    return $this['response']->stream(function() {
        echo 'Hello World';
        flush();
        echo 'Hello GreenCheap';
        flush();
    });
}
```

## Download

Download response allows you to send a file to the client. Sets `Content-Disposition: attachment` to force the _Save as_ dialog box in most browsers.

```php
public function downloadAction()
{
    return $this['response']->download('extensions/hello/extension.svg');
}
```