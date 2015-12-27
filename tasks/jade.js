/**
 * Compile HTML files from Jade sources.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path    = require('path'),
    gulp    = require('gulp'),
    jade    = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    rename  = require('gulp-rename'),
    del     = require('del'),
    pkgInfo = require(path.join(global.paths.root, 'package.json')),
    entry   = path.join(global.paths.src, 'jade', 'main.jade');


// remove all html files
gulp.task('jade:clean', function () {
    return del([
        path.join(global.paths.app, 'index.html'),
        path.join(global.paths.app, 'develop.html')
    ]);
});


// generate html files
gulp.task('jade:develop', function () {
    return gulp
        .src(entry)
        .pipe(plumber())
        .pipe(jade({
            pretty: '\t',
            locals: {
                develop: true,
                title: '[develop] ' + pkgInfo.name,
                version: pkgInfo.version
            }
        }))
        .pipe(rename('develop.html'))
        .pipe(gulp.dest(global.paths.app));
});


// generate html files
gulp.task('jade:release', function () {
    return gulp
        .src(entry)
        .pipe(plumber())
        .pipe(jade({
            pretty: false,
            locals: {
                develop: false,
                title: '[release] ' + pkgInfo.name,
                version: pkgInfo.version
            }
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(global.paths.app));
});


// generate all html files
gulp.task('jade', ['jade:develop', 'jade:release']);
