#!/usr/bin/env node

/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var program = require('commander'),
    pkgData = require('../package.json');

program
    .version(pkgData.version)
    .usage('[options] <task ...>')
    .parse(process.argv);

global.DEBUG = true;

// enable colors in console
require('tty-colors');

require('../lib/app').init({
    tasks: program.args,
    //plugins: Object.keys(pkgData.optionalDependencies)
    plugins: [
        'spa-plugin-jade',
        'spa-plugin-static'
    ]
});
