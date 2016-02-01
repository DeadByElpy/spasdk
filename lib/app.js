/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var fs      = require('fs'),
    path    = require('path'),
    Emitter = require('cjs-emitter'),
    debug   = require('debug')('app'),
    //tasks   = require('./tasks'),
    app     = new Emitter(),
    cwd     = process.cwd(),
    ignore  = [];

//debug('init');

app.package = require(path.join(cwd, 'package.json'));
app.paths   = {
    root:          cwd,
    project:       path.join(cwd, '.sdk'),
    ignorePlugins: path.join(cwd, '.sdk', 'ignore.json')
};

try {
    fs.mkdirSync(app.paths.project);
    debug('create project directory: ' + app.paths.project);
} catch ( error ) {
    debug('existing project directory: ' + app.paths.project);
}

try {
    ignore = require(app.paths.ignorePlugins);
    debug('ignore plugins', ignore);
} catch ( error ) {
    debug('no ignored plugins');
}

app.init = function ( config ) {
    debug('tasks to execute', config.start);

    Object.keys(require('../package.json').optionalDependencies).forEach(function ( name ) {
        if ( ignore.indexOf(name) === -1 ) {
            debug('load ' + name);
        } else {
            debug('skip ' + name);
        }

    });
};

//tasks.load('spa-system-');


//debug('exit');

// public
module.exports = app;
