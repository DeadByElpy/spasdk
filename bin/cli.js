#!/usr/bin/env node

/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var app    = require('../index'),
    debug  = require('debug')('app:cli'),
    runner = app.runner,
    tasks  = process.argv.slice(2);

// add main task
if ( !tasks.length ) {
    tasks.push('default');
}

debug('tasks to execute', tasks);

runner.run(runner.serial.apply(runner, tasks));


//var tList = [], aList = [];
//
//Object.keys(this.tasks).sort().forEach(function ( name ) {
//    console.log(typeof self.tasks[name]);
//    if ( typeof self.tasks[name] === 'function' ) {
//        tList.push(name);
//    } else {
//        aList.push(name);
//    }
//});
//this.debug('tasks: ' + tList.join(', '));
//this.debug('aliases: ' + aList.join(', '));

/*var program = require('commander'),
    pkgData = require('../package.json');

program
    .version(pkgData.version)
    .usage('[options] <task ...>')
    .option('-l, --list <items>', 'A list')
    .parse(process.argv);

global.DEVELOP = true;

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
        'spa-webui'
    ]
});/**/
