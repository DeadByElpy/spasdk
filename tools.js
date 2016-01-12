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
    var packageConfig = require(fileName),
        projectConfig = {};

    try {
        // this config file is not mandatory
        projectConfig = require(path.join(process.env.PATH_ROOT, process.env.PATH_CFG, 'gulp'));
    } catch ( error ) {}

    // sanitize
    projectConfig[gulpName] = projectConfig[gulpName] || {};
    projectConfig[gulpName].profiles = projectConfig[gulpName].profiles || {};

    // merge user general config with the package config
    extend(true, packageConfig, projectConfig[gulpName] || {});

    // merge all profiles with the default one
    Object.keys(packageConfig.profiles).forEach(function ( name ) {
        // do not allow to change default profile
        if ( name !== 'default' ) {
            // profile name is marked for deletion with null/false
            if ( name in projectConfig[gulpName].profiles && !projectConfig[gulpName].profiles[name] ) {
                delete packageConfig.profiles[name];
            } else {
                // merge this profile with the default one
                packageConfig.profiles[name] = extend(
                    true, {}, packageConfig.profiles.default, packageConfig.profiles[name]
                );
            }
        }
    });

    return packageConfig;
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
