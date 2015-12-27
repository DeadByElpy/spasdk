/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path = require('path'),
    gulp = require('gulp'),
    load = require('./lib/tools').load,
    env  = process.env;


// enable colors in console
require('tty-colors');


// set global paths
env.PATH_ROOT = env.PATH_ROOT || process.cwd();
env.PATH_APP  = env.PATH_APP  || path.join(env.PATH_ROOT, 'app');
env.PATH_SRC  = env.PATH_SRC  || path.join(env.PATH_ROOT, 'src');
env.PATH_CFG  = env.PATH_CFG  || path.join(env.PATH_ROOT, 'config');


// load all tasks
//load(path.join(__dirname, 'tasks'));

//require('./tasks/img');
require('./tasks/jade');
require('./tasks/lint');
require('./tasks/repl');
require('./tasks/webpack');


// public
module.exports = gulp;
