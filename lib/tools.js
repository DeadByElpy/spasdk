/**
 * Task configuration loader.
 * Merge all profiles with default profile.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path       = require('path'),
    //gulp       = require('gulp'),
    extend     = require('extend'),
    notifier   = require('node-notifier'),
    util       = require('gulp-util'),
    inspect    = require('util').inspect,
    //rootConfig = require('./config'),
    pkgInfo    = require(path.join(process.cwd(), 'package.json'));


function config ( baseFile, userFile, gulpName ) {
    var baseConfig = require(baseFile),
        userConfig = require(userFile)[gulpName],
        result     = null;

    //console.log('userConfig');
    //console.log(userConfig);

    //extend(true, baseConfig.default, userConfig.default);

    //try {
    //    // this config file is not mandatory
    //    userConfig = require(
    //        path.join(process.env.PATH_ROOT, process.env.PATH_CFG, 'gulp')
    //    );
    //} catch ( error ) {
    //    module.exports.error('config', error.message);
    //}
	//
    //// sanitize task set object and root default
    //userConfig = userConfig || {};
    //userConfig = typeof userConfig === 'object' ? userConfig : {};
    //userConfig.default = userConfig.default || {};
    //userConfig.default = typeof userConfig.default === 'object' ? userConfig.default : {};
	//
    // task set is not marked for deletion with null/false
    if ( userConfig !== null && userConfig !== false ) {
        // sanitize profiles object
        //userConfig[gulpName] = typeof userConfig[gulpName] === 'object' ? userConfig[gulpName] : {};

        // merge user general config with the package base config
        result = extend(true, {}, baseConfig, userConfig);

        // remove profiles marked for deletion with null/false
        Object.keys(result).forEach(function ( name ) {
            if ( !result[name] ) {
                delete result[name];
            }
        });

        // extend profiles
        Object.keys(result).forEach(function ( name ) {
            // not the default profile
            if ( name !== 'default' ) {
                // merge this profile with the default one
                result[name] = extend(
                    true, {}, result.default, result[name]
                );
            }
        });
    }

    //console.log(inspect(result, {depth: 5, colors: true}));
    return result;
}


//function init ( config ) {
//    Object.keys(pkgInfo.dependencies).forEach(function ( name ) {
//        // get only gulp task packages
//        if ( name.indexOf(config.prefix) === 0 ) {
//            load(name);
//        }
//    });
//}


//function load ( prefix ) {
//    var tasks = {};
//
//    Object.keys(pkgInfo.dependencies).forEach(function ( name ) {
//        // get only gulp task packages
//        if ( name.indexOf(prefix) === 0 ) {
//            extend(true, tasks, require(name));
//        }
//    });
//
//    //var tasks = require(name);
//
//    //console.log(tasks);
//    return tasks;
//}


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
        config.icon = path.join(__dirname, 'media', config.icon + '.png');
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


function notify ( config ) {
    // sanitize
    config = config || {};
    config.console = config.console || {};
    config.popup   = config.popup   || {};
    config.sound   = config.sound   || {};

    return {
        info: function ( data ) {
            if ( config.console.info ) {
                (Array.isArray(data.info) || data.info.split('\n')).forEach(function ( line ) {
                    util.log(pad(data.name).inverse, line);
                });
            }

            if ( config.popup.info ) {
                data.icon = data.icon || path.join(__dirname, 'media', 'info.png');
                notifier.notify(data);
            }

            if ( config.sound.info ) {

            }
        },

        error: function ( data ) {

        }
    };
}


//function register ( tasks ) {
//    // extract global tasks
//    Object.keys(tasks).forEach(function ( name ) {
//        var parts = name.split(':');
//
//        // task like "jade:build"
//        if ( parts.length === 2 ) {
//            // create/add in general list
//            tasks[parts[1]] = tasks[parts[1]] || [];
//            tasks[parts[1]].push(name);
//        }
//    });
//
//    // create gulp tasks
//    Object.keys(tasks).forEach(function ( name ) {
//        // skip marked for deletion
//        if ( name && tasks[name] ) {
//            gulp.task(name, tasks[name]);
//        }
//    });
//
//    console.log(tasks);
//
//    return tasks;
//
//    //var topKeys = Object.keys(tree);
//
//    //Object.keys(tree).forEach(function ( topName ) {
//    //    //var subKeys = Object.keys(tree[topName]);
//	//
//    //    //console.log(topName, tree[topName]);
//    //    gulp.task(topName, tree[topName]);
//	//
//    //    //subKeys.forEach(function ( subName ) {
//    //    //    console.log(topName, subName, tree[topName][subName]);
//    //    //});
//    //});
//}


// public
module.exports = {
    //init:   init,
    //load:   load,
    log:    log,
    error:  error,
    popup:  popup,
    notify: notify,
    config: config
    //register: register
};
