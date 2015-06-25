'use strict';

var fs = require('fs'),
    path = require('path'),
    less = require('less-middleware'),
    favicon = require('serve-favicon'),
    serveStatic = require('serve-static'),
    debugLib = require('debug'),
    l10n = require('./l10n'),
    errors = require('./errors');
var debug = debugLib('themible');

var checkDirectory = function checkDirectory(directory) {
  try {
    var stats = fs.lstatSync(directory);
    var result = stats.isDirectory();
    if (!result) {
      throw new Error();
    }
  } catch (err) {
    throw errors.THEMIBLE_INVALID_DIRECTORY(directory);
  }
};

var getLocales = function getLocales(localesDir) {
  return fs.readdirSync(localesDir).map(function(fileName) {
    return fileName.substring(0, fileName.length - 5);
  });
};

/**
 * Themible object.
 * @type {middleware}
 */
module.exports = exports = function middleware(app, themeDir, themePath) {
  if (!app || !app.use) {
    throw errors.THEMIBLE_INVALID_PARAM('app');
  }
  if (!themeDir) {
    throw errors.THEMIBLE_INVALID_PARAM('themeDir');
  }
  if (!themePath) {
    throw errors.THEMIBLE_INVALID_PARAM('themePath');
  }

  var themeFilesDir = path.join(themeDir, 'public');
  var localesDir = path.join(themeDir, 'locales');

  checkDirectory(themeDir);
  checkDirectory(themeFilesDir);
  checkDirectory(localesDir);

  var locales = getLocales(localesDir);

  try {
    app.use(favicon(path.join(themeFilesDir, 'favicon.ico')));
  } catch (err) {
    try {
      app.use(favicon(path.join(themeFilesDir, 'favicon.png')));
    } catch (error) {
      debug('Favicon resource not found.');
    }
  }

  app.use(themePath, less(themeFilesDir));
  app.use(themePath, serveStatic(themeFilesDir));
  app.use(l10n(locales, localesDir));
};
