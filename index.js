/**
 * @module stb-gulp
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path = require('path'),
	gulp = require('gulp'),
	load = require('./lib/tools');


// general app paths
global.paths = {
	root:   process.env.PATH_ROOT   || __dirname,
	tasks:  process.env.PATH_TASKS  || path.join(__dirname, 'tasks'),
	app:    process.env.PATH_APP    || path.join(__dirname, 'app'),
	build:  process.env.PATH_BUILD  || path.join(__dirname, 'build'),
	config: process.env.PATH_CONFIG || path.join(__dirname, 'config')
};

// load all tasks
load(global.paths.tasks);


// public
module.exports = gulp;
