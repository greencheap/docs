<p class="uk-article-lead">A package is the concept of expanding Green cheap's functionality. Packages come in two different types: Plugins and Themes.</p>

## package location

All packages, it is located in the `/packages` directory sorted by vendor in subdirectories.

Each package belongs to a specific vendor, for example, you can access the `greencheap` file for all official packages, including the _blog_ extension and _One theme_.

Vendor name is a unique representation of a developer or organization. In the simplest case, it only matches the GitHub username. The package name also defines the name of the directory in which it is stored.

## Package contents
One package contains at least two files.
1. 'composer.JSON ' contains the metadata of your package and therefore acts as the package definition.
2. 'index.php ' is called module definition and adds real functionality to Green cheap.

The rest of the package content depends on the package type. Check out the theme tutorial or extension tutorial to learn more about the actual content of a package.

## Package description
A package is defined by "composer.JSON". This files, package name, Includes potential dependencies to be established by [Composer](https://getcomposer.org) and other information displayed in the GreenCheap market.

For a theme, this file may look like the following.

```json
{
    "name": "greencheap/theme-hello",
    "type": "greencheap-theme",
    "version": "0.9.0",
    "title": "Hello",
    "description": "A blueprint to develop your own themes.",
    "license": "MIT",
    "authors": [
        {
            "name": "GreenCheap",
            "email": "support@greencheap.net",
            "homepage": "http://greencheap.net"
        }
    ],
    "extra": {
        "image": "image.jpg"
    }
}
```

For more details about this file, see. [Composer Document](https://getcomposer.org/doc/01-basic-usage.md).

## Loading hooks
A package can be enabled, can be disabled or cannot be installed. Changing the situation, you may need to modify your database schema or run other custom code.

Green Cheap, provides installation hooks through a custom script. This file must be defined in your package definition, which is a `composer.json` file.

```json
    "extra": {
        "scripts": "scripts.php"
    }
```

Scripts command file, must return a PHP array containing callbacks.

```php
return [

    'install' => function ($app) {},
    'uninstall' => function ($app) {},
    'enable' => function ($app) {},
    'disable' => function ($app) {},
    'updates' => [

        '0.5.0' => function ($app) {},
        '0.9.0' => function ($app) {}

    ]
];
```

### Install

The load hook is executed after a package _installed_ operation.

### Uninstall
The Uninstall hook is executed before a packet _uninstalled_.

Green Cheap, even if your extension is _disabled_ or _uninstalled_ in the admin panel, does not change the tables that you create. You will need to handle the necessary database changes yourself.

### Enable
Enable hook is executed after _enabled_ is done in a package.

### Disable
Disable hook is executed before _disabled_ a packet.

### Updates
When a package is enabled, Green Cheap checks for update hooks that are newer than the current version. If so, they are executed sequentially.