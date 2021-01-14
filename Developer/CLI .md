<p class="uk-article-lead"> GreenCheap, provides developers with some of their core functions through the command-line interface (CLI). A number of commands are available that offer useful tools and assistants. </p>

## Basic use

Open a terminal and go to the directory of an existing GreenCheap installation. The `greencheap` (no file extension) script in this directory is a PHP script that can run commands.

```sh
cd /var/www/greencheap   # navigate to greencheap directory
./greencheap             # run greencheap CLI script
```

**Note** You may need to make this script executable using `chmod +x greencheap`. Alternatively, you can explicitly call your PHP interpreter `php greencheap`.

When calling the CLI tool without any arguments, GreenCheap version number, it will extract some basic usage information and list the available commands you can use

```txt
$ ./greencheap
greencheap version 1.0.3

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  archive              Archives an extension or theme
  build                Builds a .zip release file
  clearcache           Clears the system cache
  help                 Displays help for a command
  install              Installs a GreenCheap package
  list                 Lists commands
  migrate              Migrates GreenCheap
  self-update          Checks for newer GreenCheap versions and installs the latest
  setup                Setup a GreenCheap installation
  start                Starts the built-in web server
  uninstall            Uninstalls a GreenCheap package
  update               Updates dependencies of GreenCheap packages
 extension
  extension:translate  Generates extension's translation .pot/.po/.php files
 translation
  translation:fetch    Fetches current translation files from languages repository
```

To run a command, you can add arguments when calling the CLI tool. For example, installing the "Hello" extension from the market will look like

```sh
./greencheap install greencheap/hello
```

## Available commands

Current commands, as well as helpers for extension and theme developers, includes tools that make looking at the GreenCheap project easier for the GreenCheap team (Like `build` commands).

### Create Package Archive

To create a downloadable "*.zip" archive from any theme or extension, run this command and specify the path to the package you want to create. The following command, It will create a file named `greencheap-hello.zip` in the parent folder of the GreenCheap installation.

Example:

```sh
./greencheap archive greencheap/hello
```

Usage, Arguments And Options:

```sh
Usage:
  archive [options] [--] <name>

Arguments:
  name                  Package name

Options:
      --dir[=DIR]       Write the archive to this directory
```

### Create GreenCheap Version Archive

This command, used by GreenCheap maintainers to create a GreenCheap release package.  It will create a `*.zip` archive in the root folder of the GreenCheap installation. This release package can then be used both as a download package from the official GreenCheap website and as a custom installation that you can deliver, etc. your customers.

Example:

```sh
./greencheap build
```

Usage (No arguments, no options):

```sh
Usage:
  build
```

### Clear Cache

You can use the `clearcache` command to empty the cache. This command, all `*.cache` files, removes it from the cache directory in `tmp/cache` in a normal GreenCheap installation.

Example:

```sh
./greencheap clearcache
```

Usage(No arguments, no options):

```sh
Usage:
  clearcache
```

### View usage information for any CLI command

To find out what a CLI command actually does and how it is used, you can use the "help" command.

Example:

```sh
./greencheap help install
```

Usage and arguments:

```
Usage:
  help [options] [--] [<command_name>]

Arguments:
  command               The command to execute
  command_name          The command name [default: "help"]

Options:
      --format=FORMAT   The output format (txt, xml, json, or md) [default: "txt"]
```

### List available commands

You can use all existing CLI commands with the `list` command. This, running the CLI script without any parameters generates the same output.

Example:

```sh
./greencheap list
```

Usage, arguments and options:

```sh
Usage:
  list [options] [--] [<namespace>]

Arguments:
  namespace            The namespace name

Options:
      --raw            To output raw command list
      --format=FORMAT  The output format (txt, xml, json, or md) [default: "txt"]
```

### Run Greencheap Transitions

After installing a new version of Greencheap, sometimes the system needs to make changes to the database structure. These changes, grouped under the name _migration. To run any transport that needs to be run, you can use the `migrate` command. Generally, you don't need to do this clearly. When you log in to the admin field, GreenCheap will also check for any transports and run them if necessary.

Example:

```sh
./greencheap migrate
```

Usage (No arguments or no options):

```sh
Usage:
  migrate
```

### Upgrading the GreenCheap installation

Upgrade your GreenCheap installation from the terminal. Arbitrarily, you can provide a link to the new GreenCheap package that must be used to run the upgrade. In this case, you must also provide a valid SHA hash that is used to verify the downloaded file. If you do not provide a URL and hash, the command will use the latest GreenCheap package in greencheap.net.

Example:

```sh
./greencheap self-update
```

Usage and options:

```sh
Usage:
  self-update [options]

Options:
  -u, --url=URL
  -s, --shasum=SHASUM
```

### Install a full GreenCheap installation

You can run a terminal command from a newly downloaded GreenCheap installation package to run the installation without opening the browser. This, it can be used for automatic installations for yourself or for client projects.

An example of setting up greencheap using SQLite and the default administrator user:

```sh
./greencheap setup --password=<SOMETHING-SECURE>
```

Usage and options:

```sh
Usage:
  setup [options]

Options:
  -u, --username=USERNAME      Admin username [default: "admin"]
  -p, --password=PASSWORD      Admin account password
  -t, --title[=TITLE]          Site title [default: "GreenCheap"]
  -m, --mail[=MAIL]            Admin account email [default: "admin@example.com"]
  -d, --db-driver=DB-DRIVER    DB driver ('sqlite' or 'mysql') [default: "sqlite"]
      --db-prefix[=DB-PREFIX]  DB prefix [default: "pk_"]
  -H, --db-host[=DB-HOST]      MySQL host
  -N, --db-name[=DB-NAME]      MySQL database name
  -U, --db-user[=DB-USER]      MySQL user
  -P, --db-pass[=DB-PASS]      MySQL password
  -l, --locale[=LOCALE]        Locale
```

### Start the built-in web server

You don't actually need a complete Apache server installation. Instead, you can run the `start` command for a standalone server instance running on your local machine. Command, it will continue to run until you press CTRL + C to exit the server instance.

```sh
./greencheap start --server=127.0.0.1:8080
```

Usage and options:

```
Usage:
  start [options]

Options:
  -s, --server[=SERVER]  Server name and port [default: "127.0.0.1:8080"]
```

### Parse the translation strings in the package

When creating a theme or extension, you can and should use Greencheap's internationalization system to ensure that the user interface can be displayed in multiple languages. Basically, custom function calls to these strings (etc. In PHP templates `__('Translate me!')` Or Vue templates `{{ 'Translate me!' |trans }}` works by turning. `extension:translate` commands, it will find all occurrences of such function calls in a particular theme or extension, and collect all translatable strings for you, and pack them in the specified package `languages/`. These files can then be used to create translations for your package, for example using a service like [Transifex](https://www.transifex.com/greencheap/greencheap-cms/).

For Example:

```sh
./greencheap extension:translate greencheap/blog
```

Usage and arguments:

```sh
Usage:
  extension:translate [<extension>]

Arguments:
  extension             Extension name
```

### Bring new translation files

**Deprecated Warning** This command will be changed.

This command, by greencheap's core minders, used to retrieve translations from the GreenCheap translation pool. The translation workflow and file structure are currently being discussed, and this command will likely be modified in a future version of Greencheap.

Example:

```sh
./greencheap translation:fetch
```

Usage:

```sh
Usage:
  translation:fetch
```
