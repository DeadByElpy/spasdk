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
    .option('-t, --task <name>', 'run task')
    .parse(process.argv);

console.log(program);

global.DEBUG = true;

// enable colors in console
require('tty-colors');

require('../lib/app');


// parse and invoke commands when defined
program.parse(process.argv);
