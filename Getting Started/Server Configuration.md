<p class="uk-article-lead">Green Cheap is written in PHP and can run in various web server configurations. Official support for Apache 2.2 + and nginx is available.</p>

## Apache 2.2+
Although greencheap should run smoothly on Apache 2.2+ without additional configuration, you may receive a warning message during installation. If you do this, at the root of your greencheap folder you must verify that the `.htaccess` file exists.

**Note** `.htaccess`  file is an Apache configuration file and is hidden on Unix-based systems; therefore, it is easy to overlook when installing the package at startup. If it is not available, copy it from the Green Cheap package.

Your Web server, it is also possible that the server configuration does not allow overriding over an `.htaccess`. In this case, contact your hosting provider and ask them to change the AllowOverride directive.

Another common problem is that the` mod_rewrite ' module is not active on your web server, in this case, you need to contact your hosting provider to enable this Apache module. If the module is not available, GreenCheap will still work but `http://example.com/index.php/page/welcome' a URL in the format will return to the format

## nginx

With Nginx, connect from [Php to Nginx](http://wiki.nginx.org/PHPFcgiExample). Update your Nginx configuration to [base sample configuration](https://gist.github.com/DarrylDias/be8955970f4b37fdd682). Remember, as the Apache solution comes out of the box, it provides more features for assets than its configuration, such as compression and cache headers. These are not currently included in the nginx configuration.
