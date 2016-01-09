/**
 * Task configuration loader.
 * Merge all profiles with default profile.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var //fs      = require('fs'),
    path   = require('path'),
    extend = require('extend')
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


// public
module.exports = {
    load: load
};
