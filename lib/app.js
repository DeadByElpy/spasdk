/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path    = require('path'),
    Emitter = require('cjs-emitter'),
    debug   = require('debug')('app'),
    tasks   = require('./tasks'),
    app     = new Emitter();

debug('init');

app.cwd     = process.cwd();
app.package = require(path.join(app.cwd, 'package.json'));

tasks.load('spa-system-');


debug('exit');

// public
module.exports = app;
