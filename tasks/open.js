/**
 * Open the default web browser with the given page.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var util = require('util'),
    path = require('path'),
    gulp = require('gulp'),
    open = require('open'),
    load = require('require-nocache')(module),
    cfg  = path.join(process.env.PATH_ROOT, process.env.PATH_CFG, 'static');


// documentation
gulp.task('open:doc', function () {
    open('http://darkpark.github.io/stb/');
});


// develop index page
gulp.task('open:develop', function () {
    open(util.format(
        'http://localhost:%s/develop.html',
        load(cfg).port
    ));
});


// release index page
gulp.task('open:release', function () {
    open(util.format(
        'http://localhost:%s/index.html',
        load(cfg).port
    ));
});


// default entry point
gulp.task('open', ['open:develop']);
