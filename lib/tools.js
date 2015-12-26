/**
 * Common tools.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var fs   = require('fs'),
    path = require('path');


/**
 * Load all js modules from the given directory.
 *
 * @param {string} dir folder with modules
 */
function load ( dir ) {
    // may be missing
    if ( fs.existsSync(dir) ) {
        // get file list and walk through it
        require('fs').readdirSync(dir).forEach(function ( name ) {
            // make correct absolute path
            name = path.join(dir, name);
            // check file type
            if ( path.extname(name) === '.js' ) {
                require(name);
            }
        });
    }
}


// public
module.exports = {
    load: load
};
