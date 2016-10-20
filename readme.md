Development tasks
=================

[![build status](https://img.shields.io/travis/spasdk/spasdk.svg?style=flat-square)](https://travis-ci.org/spasdk/spasdk)
[![npm version](https://img.shields.io/npm/v/spasdk.svg?style=flat-square)](https://www.npmjs.com/package/spasdk)
[![dependencies status](https://img.shields.io/david/spasdk/spasdk.svg?style=flat-square)](https://david-dm.org/spasdk/spasdk)
[![devDependencies status](https://img.shields.io/david/dev/spasdk/spasdk.svg?style=flat-square)](https://david-dm.org/spasdk/spasdk?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/spasdk)


## Installation ##

```bash
npm install spasdk
```


## Usage ##

Add to the scope:

```js
var spasdk = require('spasdk');
```

#### Environment variables

 Name      | Description
-----------|-------------
 PATH_ROOT | read-only absolute path to main application directory (where `package.json` is located)
 PATH_APP  | relative to PATH_ROOT directory with files ready to be deployed
 PATH_SRC  | relative to PATH_ROOT directory with source files to generate development and release application files
 PATH_CFG  | relative to PATH_ROOT directory with configuration files for tasks and application itself
 PACKAGE   | read-only absolute path to the application `package.json` file

Some to these variables can be redefined in run-time:

```bash
PATH_CFG=some_other_dir gulp
```


## Application configuration ##

The directory contains all application configuration files.

File `gulp.js` can redefine default configuration options for all gulp tasks.

For example:

```js
module.exports = {
    default: {
        notifications: {
            popup: {
                fail: false
            }
        }
    },
    jade: {
        default: {
            source: 'sources/pug/main.pug'
        },
        develop: {
            target: 'dst/debug.html'
        },
        release: false,
        test: {}
    },
    sass: false
};
```

This will apply the following changes:

* disable failure popup notifications for all profiles and all tasks
* set `sources/pug/main.pug` as the main entry point (instead of default `src/jade/main.jade`) for all Jade profiles
* set `dst/debug.html` as  the intended output file (instead of default `app/develop.html`) for Jade `develop` profile only
* remove Jade `release` profile
* add new Jade `test` profile filled with options from `default` profile
* completely disable all SASS tasks


To make sure all options are correct it's possible to print the current config set:

```bash
gulp jade:config
```


## Contribution ##

If you have any problem or suggestion please open an issue [here](https://github.com/spasdk/spasdk/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License ##

`spasdk` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
