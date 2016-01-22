/**
 * Task loading and gulp task creation.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path    = require('path'),
    gulp    = require('gulp'),
    extend  = require('extend'),
    pkgInfo = require(path.join(process.cwd(), 'package.json'));


// public
module.exports = {
    load: function ( prefix ) {
        var tasks = {},
            names = Object.keys(pkgInfo.dependencies).concat(Object.keys(pkgInfo.devDependencies || {}));

        names.forEach(function ( name ) {
            // get only gulp task packages
            if ( name.indexOf(prefix) === 0 ) {
                extend(true, tasks, require(name).tasks);
            }
        });

        return tasks;
    },

    register: function ( tasks ) {
        // extract global tasks
        Object.keys(tasks).forEach(function ( name ) {
            var parts = name.split(':');

            // task like "jade:build"
            if ( parts.length === 2 ) {
                // create/add in general list
                tasks[parts[1]] = tasks[parts[1]] || [];
                tasks[parts[1]].push(name);
            }
        });

        // create gulp tasks
        Object.keys(tasks).forEach(function ( name ) {
            // skip marked for deletion
            if ( name && tasks[name] ) {
                gulp.task(name, tasks[name]);
            }
        });

        return tasks;
    }
};
