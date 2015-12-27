/**
 * Pack a specific build into zip archive.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path    = require('path'),
    util    = require('util'),
    gulp    = require('gulp'),
    log     = require('gulp-util').log,
    plumber = require('gulp-plumber'),
    zip     = require('gulp-zip'),
    del     = require('del'),
    pkgInfo = require(path.join(process.env.PATH_ROOT, 'package.json')),
    zipName = 'build.%s.%s.%s.zip',
    title   = 'pack    '.inverse;


// remove all pack zip files
gulp.task('pack:clean', function () {
    return del([path.join(process.env.PATH_ROOT, util.format(zipName, '*', '*', '*'))]);
});


// create archive
gulp.task('pack:develop', function () {
    var outName = util.format(zipName, pkgInfo.name, pkgInfo.version, 'develop');

    log(title, 'create archive: ' +  outName.bold);

    return gulp
        .src([
            path.join(process.env.PATH_APP, 'font', '**', '*'),
            path.join(process.env.PATH_APP, 'img', '**', '*'),
            path.join(process.env.PATH_APP, 'css', 'develop.*'),
            path.join(process.env.PATH_APP, 'js', 'develop.*'),
            path.join(process.env.PATH_APP, 'develop.html')
        ],
        {base: process.env.PATH_APP})
        .pipe(plumber())
        .pipe(zip(outName))
        .pipe(gulp.dest(process.env.PATH_ROOT));
});


// create archive
gulp.task('pack:release', function () {
    var outName = util.format(zipName, pkgInfo.name, pkgInfo.version, 'release');

    log(title, 'create archive: ' +  outName.bold);

    return gulp
        .src([
            path.join(process.env.PATH_APP, 'font', '**', '*'),
            path.join(process.env.PATH_APP, 'img', '**', '*'),
            path.join(process.env.PATH_APP, 'css', 'release.*'),
            path.join(process.env.PATH_APP, 'js', 'release.*'),
            path.join(process.env.PATH_APP, 'index.html')
        ],
        {base: process.env.PATH_APP})
        .pipe(plumber())
        .pipe(zip(outName))
        .pipe(gulp.dest(process.env.PATH_ROOT));
});


// create all archives
gulp.task('pack', ['pack:develop', 'pack:release']);
