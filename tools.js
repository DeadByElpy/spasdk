/**
 * Task configuration loader.
 * Merge all profiles with default profile.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path     = require('path'),
    gulp     = require('gulp'),
    extend   = require('extend'),
    notifier = require('node-notifier'),
    util     = require('gulp-util');


function load ( appConfig, pkgConfig ) {
    var config = {};

    try {
        config = require(appConfig);
    } catch ( error ) {
        try {
            config = require(pkgConfig);
        } catch ( error ) {
            console.log(error);
        }
    }

    // sanitize
    config.profiles = config.profiles || {};
    config.profiles.default = config.profiles.default || {};

    Object.keys(config.profiles).forEach(function ( name ) {
        if ( name !== 'default' ) {
            config.profiles[name] = extend(true, {}, config.profiles.default, config.profiles[name]);
        }
    });

    return config;
}


function pad ( str ) {
    return str + (new Array(Math.max(8 - str.length + 1, 0))).join(' ');
}


function log ( name, message ) {
    var title = pad(name).inverse;

    message = Array.isArray(message) ? message : message.split('\n');

    // make nice console output
    message.forEach(function ( line ) {
        util.log(title, line.reset);
    });
}


function error ( name, message ) {
    var title = pad(name).bgRed;

    message = Array.isArray(message) ? message : message.split('\n');

    // make nice console output
    message.forEach(function ( line ) {
        util.log(title, line.reset);
    });

    // popup
    notifier.notify({
        icon: path.join(__dirname, 'img', 'error.png'),
        title: name,
        message: message
    });
}


function registerTasks ( tree ) {
    //console.log(tree);
    //return;

    //var topKeys = Object.keys(tree);

    Object.keys(tree).forEach(function ( topName ) {
        //var subKeys = Object.keys(tree[topName]);

        //console.log(topName, tree[topName]);
        gulp.task(topName, tree[topName]);

        //subKeys.forEach(function ( subName ) {
        //    console.log(topName, subName, tree[topName][subName]);
        //});
    });
}


// public
module.exports = {
    log:   log,
    error: error,
    load:  load,
    registerTasks: registerTasks
};
