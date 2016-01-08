/**
 * Task error messaging.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path     = require('path'),
    log      = require('gulp-util').log,
    notifier = require('node-notifier');


// public
module.exports = function ( name, message ) {
    var title = name + (new Array(Math.max(8 - name.length + 1, 0))).join(' ');

    // make nice console output
    message.split('\n').forEach(function ( line ) {
        log(title.bgRed, line.reset);
    });

    // popup
    notifier.notify({
        icon: path.join(__dirname, '..', 'img', 'error.png'),
        title: name + ' task',
        message: message
    });
};
