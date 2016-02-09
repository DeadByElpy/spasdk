/**
 * Analyse JavaScript code for potential errors and problems.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path    = require('path'),
    gulp    = require('gulp'),
    plumber = require('gulp-plumber'),
    eslint  = require('gulp-eslint'),
    log     = require('gulp-util').log;


gulp.task('lint', function () {
    return gulp
        .src([
            path.join(process.env.PATH_SRC, 'js', '**', '*.js'),
            path.join(process.env.PATH_CFG, '**', '*.js')
        ])
        .pipe(plumber())
        //.pipe(eslint({configFile: path.join(process.cwd(), '.eslintrc')}))
        .pipe(eslint())
        .pipe(eslint.format('stylish', function ( result ) {
            // make nice output
            result.split('\n').forEach(function ( line ) {
                log('eslint  ', line + ''.reset);
            });
        }));
});
