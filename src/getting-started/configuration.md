# Configuration
<p class="uk-article-lead">Greencheap configuration file, GreenCheap is created automatically when you install it. If you want to change the configuration settings manually, this article describes the syntax and contents of the file.</p>

Usually, you do not need to deal with the configuration file 'config.php' after it is created by the installer. Normal way to change configuration, GreenCheap is the _ System > Settings page in the admin panel.

Sometimes edit this file manually, it is necessary and useful, for example when troubleshooting a broken installation or moving an existing GreenCheap installation to a new server.

in the code list below, you see an example configuration with the most common settings.

You usually have a single database connection. Example, it contains both examples that show how the configuration works for different database drivers. Only the `default` link will be used by GreenCheap (this example uses `sqlite`).

```php
'database' => [
  'default' => 'sqlite',        // Default database connection
  'connections' => [            // Array of database connections
    'sqlite' => [               // Database driver name, here: sqlite
      'prefix' => 'gc_',        // Prefix before each table
    ],
    'mysql' => [                // Database driver name, here: mysql
      'host' => 'localhost',    // The server host name
      'user' => 'user',         // Server user name
      'password' => 'pass',     // Server user password
      'dbname' => 'greencheap', // Database name
      'prefix' => 'gc_'         // Prefix before each table
    ],
  ]
],
'system' => [
  'secret' => 'secret'          // A hidden string created during installation
],
'system/cache' => [
  'caches' => [
    'cache' => [
      'storage' => 'auto'       // Cache method to use if enabled
    ]
  ],
  'nocache' => false            // Disable the cache state completely by setting it to - true 
],
'system/finder' => [
  'storage' => '/storage'       // Downloads, cache, etc. relative path of a folder used for
],
'application' => [
  'debug' => false              // Debug mode status, during development, you can enable debugging for output
],
'debug' => [
  'enabled' => false            // Debugging the toolbar case, information retrieval, requests, routes etc.
]
```