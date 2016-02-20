/**
 * Common configuration for SPA gulp tasks.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path = require('path');


// root SPA config
// to be extended in other gulp packages
module.exports = {
    //default: {
    // directory to look for source files
    source: 'src',

    // directory to store output files
    target: 'app',

    // base port
    //port: 8000,

    // info channels
    notifications: {
        console: {
            info: true,
            warn: true,
            fail: true
        },
        popup: {
            info: {show: false, icon: path.join(__dirname, 'media', 'info.png')},
            warn: {show: true,  icon: path.join(__dirname, 'media', 'warn.png')},
            fail: {show: true,  icon: path.join(__dirname, 'media', 'fail.png')}
        },
        sound: {
            info: {play: false, file: path.join(__dirname, 'media', 'info.wav')},
            warn: {play: false, file: path.join(__dirname, 'media', 'warn.wav')},
            fail: {play: false, file: path.join(__dirname, 'media', 'fail.wav')}
        }
    }

    // false to prevent watch task creation
    // otherwise array of files to monitor
    // see format in https://github.com/isaacs/node-glob
    //watch: false
    //}
};
