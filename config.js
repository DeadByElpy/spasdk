/**
 * Common configuration for gulp tasks.
 *
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

// public
module.exports = {
    default: {
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
        }
    }
};
