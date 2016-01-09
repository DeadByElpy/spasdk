/**
 * Task configuration loader.
 * Merge all profiles with default profile.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var //fs      = require('fs'),
    path     = require('path'),
    extend   = require('extend'),
    notifier = require('node-notifier'),
    util     = require('gulp-util')
    //gulp    = require('gulp'),
    //jade    = require('jade'),
    //jade    = require('gulp-jade'),
    //plumber = require('gulp-plumber'),
    //rename  = require('gulp-rename'),
    //del     = require('del'),
    //load    = require('require-nocache')(module),
    //entry   = path.join(process.env.PATH_SRC, 'jade', 'main.jade'),
    //cfg     = path.join(process.env.PATH_ROOT, process.env.PATH_CFG, 'jade')
    ;


function load ( appConfig, pkgConfig ) {
    //console.log(appConfig, pkgConfig);
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


    //    var profile = config.profiles[name];
	//
    //    if ( name !== 'default' ) {
    //        Object.keys(defaults).forEach(function ( name ) {
    //            profile[name]
    //            defaults[name]
    //        });
    //    }
    });

    //console.log(config);

    return config;
}


function log ( name, message ) {
    var title = name + (new Array(Math.max(8 - name.length + 1, 0))).join(' ');

    // make nice console output
    message.split('\n').forEach(function ( line ) {
        util.log(title, line.reset);
    });
}


function error ( name, message ) {
    var title = name + (new Array(Math.max(8 - name.length + 1, 0))).join(' ');

    // make nice console output
    message.split('\n').forEach(function ( line ) {
        util.log(title.bgRed, line.reset);
    });

    // popup
    notifier.notify({
        icon: path.join(__dirname, 'img', 'error.png'),
        title: name + ' task',
        message: message
    });
}


// public
module.exports = {
    log:   log,
    error: error,
    load:  load
};
