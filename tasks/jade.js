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
    pkgInfo = require(path.join(process.env.PATH_ROOT, 'package.json')),
    entry   = path.join(process.env.PATH_SRC, 'jade', 'main.jade');


// remove all html files
gulp.task('jade:clean', function () {
    return del([
        path.join(process.env.PATH_APP, 'index.html'),
        path.join(process.env.PATH_APP, 'develop.html')
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
        .pipe(gulp.dest(process.env.PATH_APP));
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
        .pipe(gulp.dest(process.env.PATH_APP));
});


// generate all html files
gulp.task('jade', ['jade:develop', 'jade:release']);
