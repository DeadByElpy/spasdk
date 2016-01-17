/**
 * Plugin class with task handling.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path     = require('path'),
    util     = require('util'),
    gulp     = require('gulp'),
    gutil    = require('gulp-util'),
    exec     = require('child_process').exec,
    notifier = require('node-notifier'),
    tools    = require('./tools'),
    pkg      = require(path.join(process.cwd(), 'package.json')),
    cwd      = process.cwd();


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
                },
                notify: function ( data ) {
                    // forward
                    self.notify(data, name);
                }
            });

            addTask('config', function () {
                tools.log(self.name, util.inspect(self.config[name], {depth: 3, colors: true}));
            });
        });
    }
}


function pad ( str ) {
    return str + (new Array(Math.max(8 - str.length + 1, 0))).join(' ');
}


Plugin.prototype = {
	/**
     * Project info from package.json.
     *
     * @type {Object}
     */
    package: pkg,


	/**
     * Print info in console, show popup and play sound.
     *
     * @param {Object} data message to show
     * @param {string} [data.type=info] notification type (info|warn|fail)
     * @param {string|Array} data.info message to show in console
     * @param {string} [data.icon] file name to use as an icon in popup window
     * @param {string} data.title popup window header
     * @param {string|Array} data.message message body to show in popup window
     * @param {string} profile name of profile to get config from
     */
    notify: function ( data, profile ) {
        var self   = this,
            config, console, popup, sound, name;

        profile = profile || 'default';
        config  = this.config[profile].notifications;

        if ( !config ) {
            // notifications are fully disabled
            return;
        }

        // default type
        data.type = data.type || 'info';

        // extract type configs
        console = config.console[data.type];
        popup   = config.popup[data.type];
        sound   = config.sound[data.type];

        if ( console ) {
            // add color according to type
            if ( data.type === 'info' ) {
                name = pad(self.name).inverse;
            } else if ( data.type === 'warn' ) {
                name = pad(self.name).black.bgYellow;
            } else {
                name = pad(self.name).bgRed;
            }
            // prepare
            data.info = data.info || data.message;
            data.info = Array.isArray(data.info) ? data.info : data.info.split('\n');
            // print
            data.info.forEach(function ( line ) {
                gutil.log(name, line);
            });
        }

        if ( popup && popup.show ) {
            // add plugin name to the title
            data.title = util.format('%s: %s (profile: %s)', self.name, data.title, profile);
            // user can redefine the default icon
            data.icon = data.icon || popup.icon;
            // prepare text
            data.message = Array.isArray(data.message) ? data.message.join('\n') : data.message;
            // show
            notifier.notify(data);
        }

        if ( sound && sound.play && sound.file ) {
            exec('aplay "' + sound.file + '"');
        }
    },


    task: function ( action, method ) {
        this.tasks[this.name + ':' + action] = method;
    }
};


// correct constructor name
Plugin.prototype.constructor = Plugin;


// public
module.exports = Plugin;
