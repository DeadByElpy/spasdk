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


function load ( name ) {
    var config = {};

    try {
        config = require(path.join(process.env.PATH_ROOT, process.env.PATH_CFG, name));
    } catch ( error ) {
        console.log(error);
        //config = require(path.join(process.env.PATH_ROOT, process.env.PATH_CFG, name));
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

    return config;
}


// public
module.exports = load;
