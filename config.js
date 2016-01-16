/**
 * Common configuration for SPA gulp tasks.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

// root SPA config
// to be extended in other gulp packages
module.exports = {
    default: {
        // directory to look for source files
        sourcePath: 'src',

        // directory to store output files
        targetPath: 'app',

        notifications: {
            console: {
                info:  true,
                error: true
            },
            popup:   {
                info:  false,
                error: true
            },
            sound:   {
                info:  false,
                error: true
            }
        },

        // false to prevent watch task creation
        // otherwise array of files to monitor
        // see format in https://github.com/isaacs/node-glob
        watch: false
    }
};
