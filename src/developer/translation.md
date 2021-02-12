<p class="uk-article-lead"> Green Cheap, it has the ability to view messages in different languages. This allows the interface to be localized for any number of languages. </p>

**Note** There is a difference between languages and locales, as there may be different versions of a particular language spoken in a particular region (for example, `en_GB` and `en_US`).


## Language Files

Greencheap's core, comes with the language files provided.

```
/app/system/languages

  /en_US
    messages.php
    formats.json
    languages.json
    territories.json

  /tr_TR
    messages.php
    formats.json
    languages.json
    territories.json

  messages.pot
```

Location                  | Description
------------------------ | -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- -------
`messages.pot` | This is the main file that contains all translatable strings. Used as the basis for creating localized versions. It is regularly uploaded to Transifex by greencheap carers.
`/en_US` <br> `/tr_TR` | Each folder corresponds to a locale
`xx_XX/formats.json` | Localized format strings
`xx_XX/languages.json` | Localized language names
`xx_XX/territories.json` | Localized zone names

Formats, languages, and regions are defined by the [Unicode Common Locale Data Repository](http://cldr.unicode.org/).

The translation is from the English version of the string to a localized version (`tr_TR/messages.php`) is a simple mapping.

```php
"No database connection." => "Could Not Connect To Database"
```

## Use

To obtain the localized version of a string, in a PHP file, global `__(...)` you can use the function. In a Vue template, use the trans filter in a string.

GreenCheap, it will automatically check the active locale and return a localized version of the current string.

In PHP Files:

```php
echo __('Save');
```

At Vue templates:

```vue
{{ 'Save' | trans }}
```

### Variables

suppose you have a registered name in `$name` and you want to include it in a localized string. You can pass parameters to translation functions to perform simple string exchange.

```php
$message = __("Hello %name%!", ["%name%" => $name]);
```

In Vue templates, you can pass parameters to the `trans` filter.

```vue
{{ 'Installing %title%' | trans {title:pkg.title} }}
```

### Pluralization

To choose from several messages depending on a number, you can use a syntax that specifies alternatives and specify specific numbers and even ranges. It also supports replacement parameters  `_c(...)` use the function.

```php
$message = _c('{0} No Item enabled.|{1} Item enabled.|]1,Inf[ Items enabled.', count($ids))
```

You can use the `transChoice` filter in Vue templates.

```vue
{{ '{0} %count% Files|{1} %count% File|]1,Inf[ %count% Files' | transChoice count {count:count} }}
```

To specify the matching number, number in fancy brackets `{0}`, you can use tags to make it more readable. These variants can also be confused with.

A space may represent a finite set of numbers: `{1,2,3,4}` and can represent numbers between two numbers: `[1, + Inf]`,'] -1.2 ['. The left delimiter can be `[` (included) or `]` (excluded). The right delimiter can be `[` (excluded) or `]` (included). You can use `-Inf` and `+Inf` for Infinite as well as numbers.

## Create language files for your extension
To translate your own extension, use the command line tool which will extract all translatable strings.

```bash
./greencheap extension:translate greencheap/extension-hello
```

This includes all strings found in `/packages/greencheap/extensions-hello/languages/messages.pot` will create. These were collected by finding all calls to one of the `__()`, `_c()` or `trans` and `transchoice` filters in the Vue components.

However, automatic detection of strings will be _ unsuccessful_ when you dynamically specify messages. Examples where the command will fail include:

```php
<?php

// string cannot be detected: no string literal used
echo __($message);

// string cannot be detected: Use format string instead
echo __('Hello' + $name);
```

```vue
// string literal without using translation filter
UIkit.notify('Item deleted');
```

Sometimes, you can't avoid these situations because you need to dynamically specify a string during Operation. The recommended solution to this problem is to include all the strings that can be found in your extension with the translation command `languages/messages.php` is to find the file.

```php
<?php

__('Message One');
__('Message Two');
_c('{0} %count% Files|one: File|more %count% File', 0);
```

The finished translation files have to be located in the `languages` folder of your extension, i.e. in `languages/tr_TR/`.
Created  `messages.pot` you can now create translations for your extensions. Manual translations [poEdit](http://www.poedit.net) you can create it with a tool like or you can also take advantage of Transifex.

The finished translation files must be located in the `languages` folder of your extension, i.e.  `languages/ tr_TR/`.

## How to determine the locale

When the installer is started, the locale is selected manually. This can then be changed in the greencheap admin panel (_System / Localization_). You can set a different locale for the front end and admin panel.

**Note** You can select only the languages available for the system extension.

## Working with message domains

`__(...)` / `_c(...) 'functions and` trans ` / ` transChoice' filters have a third parameter to set a _ field name. The default domain is ' messages`, therefore so far `messages.* 'we're dealing with files. All extensions share their strings in this domain. Therefore, strings translated by the system extension, available immediately without the need to flip again. This includes generic terms such as _Save_, _Error_, or _Month_.

Actually, before `./ greencheap extension` translate hello`  when we call, the resulting `messages.pot`, even if they are in the Hello extension, it did not contain any of the system messages.

There may be a situation where you do not want to share messages from the default domain. Set your own domain and re-create `*.pot` files. To keep your localization completely separate from the system, you can do this for individual strings or set the parameter on all strings.

```php
$msg = __("Hello Universe", [], "hello");
```