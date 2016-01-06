/**
 * Compile all SASS files into a set of css files with maps.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var fs         = require('fs'),
    path       = require('path'),
    util       = require('util'),
    gulp       = require('gulp'),
    sass       = require('node-sass'),
    load       = require('require-nocache')(module),
    //plumber    = require('gulp-plumber'),
    //rename     = require('gulp-rename'),
    del        = require('del'),
    entryApp     = path.join(process.env.PATH_ROOT, 'node_modules', 'spa-app', 'sass', 'main.scss'),
    entryDevelop = path.join(process.env.PATH_ROOT, 'node_modules', 'spa-develop', 'sass', 'main.scss'),
    entrySrc     = path.join(process.env.PATH_ROOT, process.env.PATH_SRC, 'sass', 'main.scss'),
    cssDevelop   = path.join(process.env.PATH_ROOT, process.env.PATH_APP, 'css', 'develop.css'),
    mapDevelop   = path.join(process.env.PATH_ROOT, process.env.PATH_APP, 'css', 'develop.map')
    ;
    //sourceMaps = require('gulp-sourcemaps'),
    //cssNano    = require('gulp-cssnano');


/**
 * Get all vars and merge them in a single list to import in less.
 *
 * @param {number} resolution window height
 *
 * @return {Object} var list
 */
//function prepare ( resolution ) {
//    var mName   = path.join(process.env.PATH_CFG, 'metrics.js'),
//        vName   = path.join(process.env.PATH_SRC, 'less', 'vars', resolution + '.js'),
//        metrics = require(mName)[resolution],
//        stbVars = require(vName),
//        data    = {};
//
//    // clear cache
//    delete require.cache[mName];
//    delete require.cache[vName];
//
//    // clone metrics
//    Object.keys(metrics).forEach(function ( name ) {
//        data[name] = metrics[name];
//    });
//
//    // safe zone dimension
//    // base dimension minus safe zone margins
//    data.availHeight = data.height - data.availTop  - data.availBottom;
//    data.availWidth  = data.width  - data.availLeft - data.availRight;
//
//    // extend with stb vars
//    Object.keys(stbVars).forEach(function ( name ) {
//        data[name] = stbVars[name];
//    });
//
//    // application paths
//    data.pathApp     = '"' + process.env.PATH_SRC + '"';
//    data.pathImg     = '"../img/' + resolution + '"';
//    data.pathImgFull = '"' + path.join(process.env.PATH_SRC, 'img', resolution.toString()) + '"';
//
//    return data;
//}


/**
 * Generate develop css files for the given graphical mode.
 *
 * @param {number} resolution window height
 *
 * @return {Object} result stream
 */
//function develop ( resolution ) {
//    var vars = prepare(resolution);
//
//    // additional vars
//    vars.mode = 'develop';
//
//    return gulp.src(path.join(process.env.PATH_SRC, 'less', resolution + '.less'))
//        .pipe(plumber())
//        .pipe(sourceMaps.init())
//        .pipe(less({
//            ieCompat: false,
//            globalVars: vars
//            //paths: [ path.join(__dirname, 'less', 'includes') ]
//        }))
//        .pipe(rename('develop.' + resolution + '.css'))
//        .pipe(sourceMaps.write('./'))
//        .pipe(gulp.dest(path.join(process.env.PATH_APP, 'css')));
//}


/**
 * Generate release css files for the given graphical mode.
 *
 * @param {number} resolution window height
 *
 * @return {Object} result stream
 */
//function release ( resolution ) {
//    var vars = prepare(resolution);
//
//    // additional vars
//    vars.mode = 'release';
//
//    return gulp.src(path.join(process.env.PATH_SRC, 'less', resolution + '.less'))
//        .pipe(plumber())
//        .pipe(less({
//            ieCompat: false,
//            globalVars: vars
//            //paths: [ path.join(__dirname, 'less', 'includes') ]
//        }))
//        .pipe(rename('release.' + resolution + '.css'))
//        .pipe(cssNano({rebase: false}))
//        .pipe(gulp.dest(path.join(process.env.PATH_APP, 'css')));
//}


//// generate develop css files
//gulp.task('less:develop:480',  function () { return develop( 480); });
//gulp.task('less:develop:576',  function () { return develop( 576); });
//gulp.task('less:develop:720',  function () { return develop( 720); });
//gulp.task('less:develop:1080', function () { return develop(1080); });
//
//
//// generate release css files
//gulp.task('less:release:480',  function () { return release( 480); });
//gulp.task('less:release:576',  function () { return release( 576); });
//gulp.task('less:release:720',  function () { return release( 720); });
//gulp.task('less:release:1080', function () { return release(1080); });
//
//
//// generate all css files
//gulp.task('less:develop', ['less:develop:480', 'less:develop:576', 'less:develop:720', 'less:develop:1080']);
//gulp.task('less:release', ['less:release:480', 'less:release:576', 'less:release:720', 'less:release:1080']);


// remove all generated css/map files
gulp.task('sass:clean', function () {
    return del([
        path.join(process.env.PATH_APP, 'css', 'develop.css'),
        path.join(process.env.PATH_APP, 'css', 'develop.css.map'),
        path.join(process.env.PATH_APP, 'css', 'release.css')
    ]);
});


gulp.task('sass:develop', function ( done ) {
    var pkgInfo = load(process.env.PACKAGE),
        data    = [];

    data.push(util.format('@import "%s";', entryApp));
    data.push(util.format('@import "%s";', entryDevelop));
    data.push(util.format('@import "%s";', entrySrc));

    console.log(data);

    sass.render({
        //file: '/path/to/myFile.scss',
        //data: 'body{background:blue; a{color:black;}}',
        data: data.join('\n'),
        outFile: cssDevelop,
        includePaths: [process.env.PATH_ROOT],
        indentWidth: 4,
        outputStyle: 'nested',
        sourceComments: true,
        sourceMap: mapDevelop,
        sourceMapContents: true
        //sourceMapRoot: 'root'
    }, function ( error, result ) {
        if ( error ) {
            console.log(error.formatted);
        } else {
            console.log(result);
            //console.log(result.map.toString());

            fs.writeFile(mapDevelop, result.map);

            fs.writeFile(cssDevelop, result.css, function ( error ) {
                if ( !error ) {
                    //file written on disk
                }

                done();
            });
        }
    });

    //var vars = {};
	//
    //// additional vars
    //vars.mode = 'develop';
	//
    ////return gulp.src(path.join(process.env.PATH_SRC, 'less', 'main.less'))
    //return gulp.src(path.join('node_modules', 'spa-develop', 'less', 'main.less'))
    //    .pipe(plumber())
    //    .pipe(sourceMaps.init())
    //    .pipe(less({
    //        ieCompat: false,
    //        globalVars: vars,
    //        paths: [
    //            path.join(process.env.PATH_ROOT, process.env.PATH_SRC),
    //            path.join(process.env.PATH_ROOT, 'node_modules')
    //            //path.join(__dirname, 'less', 'includes')
    //        ]
    //    }))
    //    .pipe(rename('develop.css'))
    //    .pipe(sourceMaps.write('./'))
    //    .pipe(gulp.dest(path.join(process.env.PATH_APP, 'css')));
});


gulp.task('sass:release', function () {
    //var vars = {};
	//
    //// additional vars
    //vars.mode = 'release';
	//
    ////return gulp.src(path.join(process.env.PATH_SRC, 'less', 'main.less'))
    //return gulp.src(path.join('node_modules', 'spa-app', 'less', 'main.less'))
    //    .pipe(plumber())
    //    .pipe(less({
    //        ieCompat: false,
    //        globalVars: vars,
    //        paths: [
    //            path.join(process.env.PATH_ROOT, process.env.PATH_SRC),
    //            path.join(process.env.PATH_ROOT, 'node_modules')
    //            //path.join(__dirname, 'less', 'includes')
    //        ]
    //    }))
    //    .pipe(rename('release.css'))
    //    .pipe(cssNano())
    //    .pipe(gulp.dest(path.join(process.env.PATH_APP, 'css')));
});


// generate all css files
gulp.task('sass', ['sass:develop', 'sass:release']);
