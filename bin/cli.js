#!/usr/bin/env node

/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var app    = require('../index'),
    runner = app.runner;

runner.run(runner.serial.apply(runner, process.argv.slice(2)));

/*var program = require('commander'),
    pkgData = require('../package.json');

program
    .version(pkgData.version)
    .usage('[options] <task ...>')
    .option('-l, --list <items>', 'A list')
    .parse(process.argv);

global.DEBUG = true;

// enable colors in console
require('tty-colors');

//console.log(program);

require('../lib/app').init({
    tasks: program.args,
    //plugins: Object.keys(pkgData.optionalDependencies)
    plugins: [
        'spa-plugin-jade',
        'spa-plugin-livereload',
        'spa-plugin-sass',
        'spa-plugin-static',
        'spa-plugin-wamp',
        'spa-plugin-webpack',
        'spa-plugin-webui'
    ]
});/**/
