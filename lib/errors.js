'use strict';

var therror = require('therror');

/**
 * Themible errors.
 */
module.exports = therror.register({

  /**
   * There was an error in theme folders.
   */
  THEMIBLE_INVALID_PARAM: {
    message: 'Invalid parameter: {1}',
    namespace: 'THEMIBLE'
  },

  /**
   * There was an error in theme folders.
   */
  THEMIBLE_INVALID_DIRECTORY: {
    message: 'Invalid directory: {1}',
    namespace: 'THEMIBLE'
  }
});
