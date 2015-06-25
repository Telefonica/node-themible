'use strict';

var i18n = require('i18n');

/**
 * Express middleware that initializes de localization system. Default locale will be 'en'.
 * @param {Array} locales
 * @param {String} directory
 * @return {Function} Express middleware.
 */
module.exports = function(locales, directory) {
  i18n.configure({
    updateFiles: false,
    locales: locales,
    directory: directory || __dirname,
    objectNotation: true
  });

  return function l10n(req, res, next) {
    i18n.init(req, res, next);
  };
};
