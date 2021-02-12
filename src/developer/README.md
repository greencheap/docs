# File Structure

<p class="uk-article-lead">When you start using GreenCheap, it is important to know your path around the file structure. GreenCheap, the core code and third-party files are very clearly separated, this should not be too important.</p>

## File System Overview

Take a look at the list below for a brief overview.

```
/app                      // main System Files
  assets                  // system assets
  console                 // console extension files
  installer               // core, Loading / Update extension files
  modules                 // core module files. Each module has its own subfolder
  system                  // core system extension files
  vendor                  // External libraries used by GreenCheap
/packages                 // Greencheap packages and 3. side packages
  composer                // files related to packages
  greencheap              // GreenCheap default packages
    blog                  // default blog plugin
    theme-one             // Default theme distributed with GreenCheap
/storage                  // site media files. Location, section can be found at System > Options
/tmp                      // temporary files
  cache                   // cache files
  logs                    // log files
  packages                // temporary package files
  sessions                // file-based user sessions
  temp                    // public temporary files
.htaccess                 // Apache configuration file. If you are using Apache, make sure it exists
CHANGELOG.md              // changelog files
config.php                // configuration file created during setup
greencheap                // CLI entry point
greencheap.db             // database files (available only if you are using SQLite)
```

## Places to explore

Although it takes a while to get used to the structure of a new project, you'll quickly find your way through important parts. The most important thing you need to know, in the `/packages` directory of themes and extensions that you always develop, it is located in a subfolder that contains your vendor name. The vendor name can be your company name or public user name, for example, our vendor name goes through greencheap.

Also, for inspiration and a better understanding of the concept of greencheap, it is a good idea to look at official packages found in `/packages/greencheap`. Also, check the `/app/modules` and `/app/system/modules` modules for examples of what can be done with a module pattern.