/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var app    = require('./lib/app'),
    runner = app.runner;


app.init({
    //tasks: process.argv.slice(2),
    //plugins: Object.keys(require('./package.json').optionalDependencies)
    plugins: [
        'spa-plugin-css',
        'spa-plugin-jade',
        'spa-plugin-livereload',
        'spa-plugin-sass',
        'spa-plugin-ssh',
        'spa-plugin-static',
        'spa-plugin-wamp',
        'spa-plugin-webpack'
    ]
});


runner.task('build', runner.serial('jade:build', 'webpack:build', /*'sass:cache', */'sass:build', 'css:build'));

runner.task('watch', runner.parallel(
    'jade:watch:develop',
    'webpack:watch:develop',
    'sass:watch:develop',
    'css:watch:develop'
));

runner.task('serve', runner.parallel(
    'wamp:serve:default',
    'static:serve:default',
    'static:serve:webui',
    'livereload:watch:default'
));

runner.task('default', runner.serial('build', runner.parallel('watch', 'serve')));


// public
module.exports = app;
