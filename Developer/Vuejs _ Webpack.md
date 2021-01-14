## Terminology

**Vue.js**, a Javascript framework for creating interactive web interfaces. Takes care to keep JavaScript objects (your model) and created templates (your view) in sync. Vue.a great introductory article can be found in JS documents. Check out the hands-on [Getting started guide](http://vuejs.org/guide/) and learn about other [high level concepts](http://blog.evanyou.me/2015/10/25/vuejs-re-introduction/)

**Vue components**, logical code entities that contain well-defined functionality and typically contain a view template and a script to describe the interaction that occurs in the component. In greencheap, many assets that you can add to the system are created as Vue components and saved to the GreenCheap system. This includes widgets, Dashboard widgets, and link types. In terms of code, they are usually found in `*.vue` files that combine JavaScript code with an HTML template. This `*.Vue` files are then pure using `Webpack*.JS` files can be compiled (see below). However, you can also create Vue components in `*.js` files, the template that the component uses is then defined in a different file or given as a simple string. In this case, you do not need Webpack.

**Webpack**, a module packager that takes your development assets (such as Vue components and plain Javascript files) and combines them into pseudo-packages. This is different from simply combining and shrinking JavaScript files. Simply put, web package packages install only modules that are required on the current page. [motivation behind Webpack](http://webpack.github.io/docs/motivation.html) hakkında daha fazla bilgi edinmek için belgelerine gidin.to learn more about [motivation behind Webpack](http://webpack.github.io/docs/motivation.html), go to the documentation

**Note** A common misconception, is that you should use Webpack when developing GreenCheap extensions. This is not the case. If it's easier to get started, create and add a single JavaScript file. You can then switch to a web package-based installation.

## File structure without Webpack

Vue.if you want to use JS without installing Webpack, todo extension has an example.

## Why use Webpack?

Without Webpack, a simple instance of the Vue component, located in a file named `example.js`, might look like:

```
new Vue({
  el: '<div>{{ message }}</div>',
  data: {
    message: 'Hello GreenCheap!'
  }
})
```

If you prefer not to use webpack, this solution is completely good. That being said, using Webpack to compile `*.vue` templates, provides a beautiful organizational structure for your files. You can both read the processing and define your JavaScript code in a file called `example.vue`:

```
<template>

	<div>
  		{{ message }}
	</div>

</template>

<script>
	module.exports = {
		data: {
    		message: 'Hello GreenCheap!'
  		}
  	}
</script>
```

As you can see, you don't need to define a template as a bulky string. Instead of, Webpack converts the readable `*.vue` file and converts it to an inline string with the template sign `*.js` dossier.

Webpack, run your terminal and then `*.vue` files `*.JS` is a tool that compiles files. At the root level of greencheap, the default is a `webpack.config.js` are. When you run `webpack` or `webpack --watch` in the greencheap folder, scans all themes and extensions in `packages` subfolders. `It Will Be Activated Again In Beta`

Your package must also have its own `webpack.config.js` in your package, for example `packages/greencheap/example/webpack.config.js`. This file, defines which `*.vue` files to compile and which output file they should be compiled in.

The following example, assumes that your `*.vue`files are located in a subfolder of your package called `packages/greencheap/example/app/components` and should be compiled in the `packages/greencheap/example/app/bundle` output folder. `/bundle`.

```
module.exports = [

    {
        entry: {
            "example"  : "./app/components/example.vue",
            "example-2": "./app/components/example-2.vue",
            "example-3": "./app/components/example-3.vue"
        },
        output: {
            filename: "./app/bundle/[name].js"
        },
        module: {
            loaders: [
                { test: /\.vue$/, loader: "vue" }
            ]
        }
    }

];
```

Open the terminal now, Navigate to the GreenCheap root folder and run `webpack` or `webpack --watch` to run Webpack using the configuration you added. You will see `*.js` files in the `app/bundle` folder of your package. For example, `example.vue`, the name `example.js` is compiled in a package file.

**Note** When managing your code through Git, we recommend adding the `app/bundle` folder to your gitignore file because only `*.Vue` contains compiled versions of your components.

Compiled package file to install and use compiled Vue components, for example, `views/example.php` name from a file in your image template. Also, for your component to be installed only after the Vue script is installed, you must require `vue` through the third parameter.

```
<?php $view->script('example', 'hello:app/bundle/example', 'vue') ?>
```

## Create and save Vue components

With file structure setup, you can now create your own scripts and Vue components. Default status described above, talks about assets you include in your own view files. However, in some cases, You create a Vue component that you want to register with the GreenCheap system so that it appears in certain parts of the GreenCheap admin interface. You can do this for the following items:

* Dashboard widgets
* Site Widgets
* Link types
* Site Tree settings, displayed as tabs when editing a single page
* Modal popup for extension settings