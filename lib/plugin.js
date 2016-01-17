/**
 * Plugin class with task handling.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path  = require('path'),
    util  = require('util'),
    gulp  = require('gulp'),
    tools = require('./tools'),
    pkg   = require(path.join(process.cwd(), 'package.json')),
    cwd   = process.cwd();


/**
 * @constructor
 *
 * @param {Object} config init options
 * @param {string} config.name gulp task set name
 * @param {string} config.entry task name used as the main entry
 * @param {Object} config.context link to a gulp plugin module
 */
function Plugin ( config ) {
    var self = this;

    this.name  = config.name;
    this.entry = config.entry;

    // merge base and user configs
    this.config = tools.config(
        path.join(path.dirname(config.context.id), 'config'),
        path.join(cwd, 'gulpfile.js'),
        this.name
    );

    this.tasks = {};

    if ( this.entry ) {
        // main task
        this.tasks[this.name] = [this.name + ':' + this.entry];
    }

    // wrapped profiles
    this.profiles = [];

    // plugin is not disabled
    if ( this.config && typeof this.config === 'object' ) {
        // wrap profiles
        Object.keys(this.config).forEach(function ( name ) {
            var profile = self.config[name],
                tasks   = self.tasks,
                addTask = function ( action, method ) {
                    var mainName = self.name + ':' + action,
                        taskName = mainName  + ':' + name;

                    // task itself
                    tasks[taskName] = method;
                    // group alias
                    tasks[mainName] = tasks[mainName] || [];
                    tasks[mainName].push(taskName);

                    return taskName;
                };

            self.profiles.push({
                name: name,
                data: profile,
                task: addTask,
                watch: function ( taskName ) {
                    // auto-rebuild is set
                    if ( profile.watch && profile.watch.length ) {
                        // done callback should be present
                        // to show gulp that task is not over
                        addTask('watch', function ( done ) {
                            gulp.watch(profile.watch, [taskName]);
                        });
                    }
                }
            });
        });

        // print plugin config
        this.tasks[this.name + ':config'] = function () {
            tools.log(self.name, util.inspect(self.config, {depth: 3, colors: true}));
        };
    }
}


Plugin.prototype = {
	/**
     * Project info from package.json.
     *
     * @type {Object}
     */
    package: pkg,

    task: function ( action, method ) {
        this.tasks[this.name + ':' + action] = method;
    }
};


// correct constructor name
Plugin.prototype.constructor = Plugin;


// public
module.exports = Plugin;
