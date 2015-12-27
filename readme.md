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
 PATH_ROOT | main application directory (where `package.json` is located)
 PATH_APP  | directory with files ready to be deployed
 PATH_SRC  | directory with source files to generate development and release application files
 PATH_CFG  | directory with configuration files for tasks and application itself

These variables can be redefined in run-time:

```bash
PATH_ROOT=some_other_dir gulp
```


## Contribution ##

If you have any problem or suggestion please open an issue [here](https://github.com/spasdk/gulp/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License ##

`spa-gulp` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
