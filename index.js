/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path = require('path'),
    gulp = require('gulp'),
    env  = process.env;


// enable colors in console
require('tty-colors');


// set global variables
env.PATH_ROOT = process.cwd();
env.PATH_APP  = env.PATH_APP || 'app';
env.PATH_SRC  = env.PATH_SRC || 'src';
env.PATH_CFG  = env.PATH_CFG || 'config';
env.PACKAGE   = path.join(process.env.PATH_ROOT, 'package.json');


// load all tasks
require('./tasks/jade');
require('./tasks/less');
require('./tasks/lint');
require('./tasks/open');
require('./tasks/pack');
require('./tasks/repl');
require('./tasks/static');
require('./tasks/watch');
require('./tasks/webpack');


// rebuild develop and release
gulp.task('build:develop', ['jade:develop', 'less:develop', 'webpack:develop']);
gulp.task('build:release', ['jade:release', 'less:release', 'webpack:release']);

// full rebuild
gulp.task('build', ['lint', 'build:develop', 'build:release']);

// start all services
gulp.task('serve', ['static', 'watch', 'repl']);

// entry point
gulp.task('default', ['build', 'serve']);


// public
module.exports = gulp;
