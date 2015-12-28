/**
 * Monitor files and rebuild.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

/* eslint no-unused-vars: 0 */

var path  = require('path'),
    gulp  = require('gulp');
    //watch = require('gulp-watch');


// rebuild everything on file changes
// done callback should be present to show gulp that task is not over
gulp.task('watch', function ( done ) {
    // jade
    gulp.watch([
        path.join(process.env.PATH_SRC, 'jade', '**', '*.jade')
    ], ['jade:develop']);

    // less
    gulp.watch([
        path.join(process.env.PATH_SRC, 'less', '**', '*.less')  // '*.{less,js}'
    ], ['less:develop']);

    // webpack
    gulp.watch([
        path.join(process.env.PATH_SRC, 'js', '**', '*.js'),
        path.join(process.env.PATH_CFG, 'app.js')
    ], ['webpack:develop']);

    //// jade
    //watch([
    //    path.join(process.env.PATH_SRC, 'jade', '**', '*.jade')
    //], function () {
    //    gulp.start('jade:develop');
    //});
	//
    //// less
    //watch([
    //    path.join(process.env.PATH_SRC, 'less', '**', '*.{less,js}'),
    //    path.join(process.env.PATH_CFG, 'metrics[.]js')
    //], function () {
    //    gulp.start('less:develop');
    //});
	//
    //// webpack
    //watch([
    //    path.join(process.env.PATH_SRC, 'js', '**', '*.js'),
    //    path.join(process.env.PATH_CFG, 'app[.]js'),
    //    path.join(process.env.PATH_CFG, 'metrics[.]js')
    //], function () {
    //    gulp.start('webpack:develop');
    //});
});
