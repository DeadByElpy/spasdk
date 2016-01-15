Development gulp tasks
======================

[![NPM version](https://img.shields.io/npm/v/spa-gulp.svg?style=flat-square)](https://www.npmjs.com/package/spa-gulp)
[![Dependencies Status](https://img.shields.io/david/spasdk/gulp.svg?style=flat-square)](https://david-dm.org/spasdk/gulp)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/spasdk)


## Installation ##

```bash
npm install spa-gulp
```


## Usage ##

Add to the scope:

```js
var gulp = require('spa-gulp');
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
                error: false
            }
        }
    },
    jade: {
        default: {
            sourcePath: 'src/pug'
        },
        develop: {
            targetFile: 'debug.html'
        },
        release: false,
        test: {}
    },
    sass: false
};
```

This will apply the following changes:

* disable error popup notifications for all profiles and all tasks
* set `pug` as the directory to look for source files (instead of default `src/jade`) for all Jade profiles
* set `debug.html` as  the intended output file name (instead of default `develop.html`) for Jade `develop` profile only
* remove Jade `release` profile
* add new Jade `test` profile filled with options from `default` profile
* completely disable all SASS tasks


To make sure all options are correct it's possible to print the current config set:

```bash
gulp jade:config
```


## Contribution ##

If you have any problem or suggestion please open an issue [here](https://github.com/spasdk/gulp/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License ##

`spa-gulp` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
