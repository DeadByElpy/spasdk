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


function load ( fileName, gulpName ) {
    var baseConfig = require(fileName) || {},
        userConfig = {},
        result     = {};

    try {
        // this config file is not mandatory
        userConfig = require(
            path.join(process.env.PATH_ROOT, process.env.PATH_CFG, 'gulp')
        ) || {};
    } catch ( error ) {}

    // task set is marked for deletion with null/false
    if ( gulpName in userConfig && !userConfig[gulpName] ) {
        result = {};
    } else {
        // merge user general config with the package config
        extend(true, result, baseConfig, userConfig[gulpName] || {});

        // merge all profiles with the default one
        Object.keys(result).forEach(function ( name ) {
            // profile name is marked for deletion with null/false
            if ( userConfig[gulpName] && name in userConfig[gulpName] && !userConfig[gulpName][name] ) {
                delete result[name];
            } else {
                // not the default profile
                if ( result.default !== result[name] ) {
                    // merge this profile with the default one
                    result[name] = extend(
                        true, {}, result.default, result[name]
                    );
                }
            }
        });
    }

    console.log(result);
    return result;
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


function popup ( config ) {
    if ( config.icon ) {
        config.icon = path.join(__dirname, 'img', config.icon + '.png');
    }

    notifier.notify(config);
}


function error ( name, message ) {
    var title = pad(name).bgRed;

    message = Array.isArray(message) ? message : message.split('\n');

    // make nice console output
    message.forEach(function ( line ) {
        util.log(title, line.reset);
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
    popup: popup,
    load:  load,
    registerTasks: registerTasks
};
