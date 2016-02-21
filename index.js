/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

global.DEBUG = true;

var app    = require('./lib/app'),
    runner = app.runner;


// enable colors in console
//require('tty-colors');

// public
module.exports = app;

app.init({
    //tasks: process.argv.slice(2),
    //plugins: Object.keys(require('./package.json').optionalDependencies)
    plugins: [
        'spa-plugin-jade',
        'spa-plugin-livereload',
        'spa-plugin-sass',
        'spa-plugin-static',
        'spa-plugin-wamp',
        'spa-plugin-webpack',
        'spa-plugin-webui'
    ]
});

//console.log(runner.tasks);


runner.task('default',
    runner.serial(
        'jade:build',
        'webpack:build',
        'sass:cache',
        'sass:build',
        runner.parallel(
            'jade:watch:develop',
            'sass:watch:cache:develop',
            'sass:watch:scss:develop',
            'webpack:watch:develop',
            'static:serve:develop',
            'wamp:serve:default',
            'webui:serve:default',
            'livereload:watch:default'
        )
    )
);


//runner.run('default');


/*// merge configs
// spa root + user
extend(true,
    require('./config').default,
    require(path.join(process.cwd(), 'gulpfile.js')).default
);

// load and create gulp tasks
tasks.register(
    tasks.load('spa-gulp-')
);*/


//console.log('rootConfig');
//console.log(rootConfig);

//console.log(module);

//console.log(require('./config'));
//console.log(userConfig);

//require('spa-gulp-jade');
//require('spa-gulp-lint');

/*var path  = require('path'),
    gulp  = require('gulp'),
    tools = require('./tools'),
    env   = process.env,
    pkgInfo;


// enable colors in console
require('tty-colors');


// set/correct global variables
env.PATH_ROOT = process.cwd();
env.PATH_APP  = env.PATH_APP || 'app';
env.PATH_SRC  = env.PATH_SRC || 'src';
env.PATH_CFG  = env.PATH_CFG || 'config';
env.PACKAGE   = path.join(process.env.PATH_ROOT, 'package.json');
env.TARGET    = 'spa';

global.tasks = {
    build: [],
    watch: [],
    clean: []
};

pkgInfo = require(env.PACKAGE);

Object.keys(pkgInfo.dependencies).forEach(function ( name ) {
    // get only gulp task packages
    if ( name.indexOf('spa-gulp-') === 0 ) {
        require(name);
    }
});

//gulp.task('build', global.tasks.build);
//gulp.task('clean', global.tasks.clean);

tools.registerTasks(global.tasks);*/


/*// load all tasks
require('./tasks/jade');
require('./tasks/less');
require('./tasks/lint');
require('./tasks/open');
require('./tasks/pack');
require('./tasks/repl');
require('./tasks/sass');
require('./tasks/static');
require('./tasks/watch');
require('./tasks/webpack');


// rebuild develop and release
gulp.task('build:develop', ['jade:develop', 'less:develop', 'webpack:develop']);
gulp.task('build:release', ['jade:release', 'less:release', 'webpack:release']);

// full rebuild
gulp.task('build', ['lint', 'build:develop', 'build:release']);

// start all services
gulp.task('serve', ['static', 'watch', 'repl']);

// entry point
gulp.task('default', ['build', 'serve']);*/


// public
//module.exports = tools;
