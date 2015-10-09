/**
 * @module stb-gulp
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path = require('path'),
	gulp = require('gulp'),
	load = require('./lib/tools').load;

// enable colors in console
require('tty-colors');

global.paths = global.paths || {};

// general app paths
//global.paths = {
//	root:   process.env.PATH_ROOT   || __dirname,
//	tasks:  process.env.PATH_TASKS  || path.join(__dirname, 'tasks'),
//	app:    process.env.PATH_APP    || path.join(__dirname, 'app'),
//	build:  process.env.PATH_BUILD  || path.join(__dirname, 'build'),
//	config: process.env.PATH_CONFIG || path.join(__dirname, 'config')
//};

global.paths.root   = global.paths.root   || process.env.PATH_ROOT   || process.cwd();
global.paths.app    = global.paths.app    || process.env.PATH_APP    || path.join(global.paths.root, 'app');
global.paths.build  = global.paths.build  || process.env.PATH_BUILD  || path.join(global.paths.root, 'build');
global.paths.config = global.paths.config || process.env.PATH_CONFIG || path.join(global.paths.root, 'config');



// load all tasks
load(path.join(__dirname, 'tasks'));

//require('./tasks/img');
//require('./tasks/jade');
//require('./tasks/lint');
//require('./tasks/repl');


// public
module.exports = gulp;
