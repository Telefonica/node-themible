'use strict';

var errors = require('../../lib/errors');
var path = require('path');
var proxyquire = require('proxyquire');

/*jshint -W064 */
/*jshint -W098 */
describe('Themible Middleware Tests', function() {

  var appMock,
      faviconMock,
      lessMock,
      serveStaticMock,
      l10nmiddMock,
      themible;

  beforeEach(function(done) {

    appMock = {
      use: function(arg1, arg2) {
        expect(arg1).to.exist;
      }
    };

    faviconMock = function(path) {
      expect(path).to.exist;
      return 'favicon';
    };

    serveStaticMock = function(path) {
      expect(path).to.exist;
      return 'static';
    };

    lessMock = function(path) {
      expect(path).to.exist;
      return 'less';
    };

    l10nmiddMock = function(locales, directory) {
      expect(locales).to.exist;
      expect(directory).to.exist;
      return 'l10n';
    };

    themible = proxyquire('../../lib/themible', {
      'serve-favicon': faviconMock,
      'serve-static': serveStaticMock,
      'less-middleware': lessMock,
      './l10n': l10nmiddMock
    });

    done();
  });

  it('should throw an error when locales do not exist', function() {
    var appUseSpy = sinon.spy(appMock, 'use');
    var exception = false;
    try {
      themible(appMock, path.join(__dirname, 'testThemes',
          'themeNoLocales'), '/themePath');
    } catch (err) {
      exception = true;
      expect(err).to.be.apiError(errors.THEMIBLE_INVALID_DIRECTORY());
    } finally {
      expect(exception).to.be.true;
      expect(appUseSpy.callCount).to.be.equal(0);
    }
  });

  it('should throw an error when locales is a file', function() {
    var appUseSpy = sinon.spy(appMock, 'use');
    var exception = false;
    try {
      themible(appMock, path.join(__dirname, 'testThemes',
          'themeLocalesFile'), '/themePath');
    } catch (err) {
      exception = true;
      expect(err).to.be.apiError(errors.THEMIBLE_INVALID_DIRECTORY());
    } finally {
      expect(exception).to.be.true;
      expect(appUseSpy.callCount).to.be.equal(0);
    }
  });

  it('should throw an error when public do not exist', function() {
    var appUseSpy = sinon.spy(appMock, 'use');
    var exception = false;
    try {
      themible(appMock, path.join(__dirname, 'testThemes',
          'themeNoPublic'), '/themePath');
    } catch (err) {
      exception = true;
      expect(err).to.be.apiError(errors.THEMIBLE_INVALID_DIRECTORY());
    } finally {
      expect(exception).to.be.true;
      expect(appUseSpy.callCount).to.be.equal(0);
    }
  });

  it('should throw an error when public is a file', function() {
    var appUseSpy = sinon.spy(appMock, 'use');
    var exception = false;
    try {
      themible(appMock, path.join(__dirname, 'testThemes',
          'themePublicFile'), '/themePath');
    } catch (err) {
      exception = true;
      expect(err).to.be.apiError(errors.THEMIBLE_INVALID_DIRECTORY());
    } finally {
      expect(exception).to.be.true;
      expect(appUseSpy.callCount).to.be.equal(0);
    }
  });

  it('should throw an error themeDir is not found', function() {
    var appUseSpy = sinon.spy(appMock, 'use');
    var exception = false;
    try {
      themible(appMock);
    } catch (err) {
      exception = true;
      expect(err).to.be.apiError(errors.THEMIBLE_INVALID_PARAM());
    } finally {
      expect(exception).to.be.true;
      expect(appUseSpy.callCount).to.be.equal(0);
    }
  });

  it('should throw an error if app is not found', function() {
    var appUseSpy = sinon.spy(appMock, 'use');
    var exception = false;
    try {
      themible();
    } catch (err) {
      exception = true;
      expect(err).to.be.apiError(errors.THEMIBLE_INVALID_PARAM());
    } finally {
      expect(exception).to.be.true;
      expect(appUseSpy.callCount).to.be.equal(0);
    }
  });

  it('should throw an error themePath is not found', function() {
    var appUseSpy = sinon.spy(appMock, 'use');
    var exception = false;
    try {
      themible(appMock, 'themeDir');
    } catch (err) {
      exception = true;
      expect(err).to.be.apiError(errors.THEMIBLE_INVALID_PARAM());
    } finally {
      expect(exception).to.be.true;
      expect(appUseSpy.callCount).to.be.equal(0);
    }
  });

  it('should set the theme an locales en and es', function() {
    var appUseSpy = sinon.spy(appMock, 'use');
    var exception = false;
    var themePath = '/themePath';
    try {
      themible(appMock, path.join(__dirname, 'testThemes',
          'theme1'), '/themePath');
    } catch (err) {
      exception = true;
    } finally {
      expect(exception).to.be.false;
      expect(appUseSpy.callCount).to.be.equal(4);
      expect(appUseSpy.withArgs('favicon').calledOnce).to.be.true;
      expect(appUseSpy.withArgs(themePath, 'less').calledOnce).to.be.true;
      expect(appUseSpy.withArgs(themePath, 'static').calledOnce).to.be.true;
      expect(appUseSpy.withArgs('l10n').calledOnce).to.be.true;
    }
  });

  it('should set the theme an locales en, es and pt', function() {
    var appUseSpy = sinon.spy(appMock, 'use');
    var exception = false;
    var themePath = '/themePath';
    try {
      themible(appMock, path.join(__dirname, 'testThemes',
          'theme2'), '/themePath');
    } catch (err) {
      exception = true;
    } finally {
      expect(exception).to.be.false;
      expect(appUseSpy.callCount).to.be.equal(4);
      expect(appUseSpy.withArgs('favicon').calledOnce).to.be.true;
      expect(appUseSpy.withArgs(themePath, 'less').calledOnce).to.be.true;
      expect(appUseSpy.withArgs(themePath, 'static').calledOnce).to.be.true;
      expect(appUseSpy.withArgs('l10n').calledOnce).to.be.true;
    }
  });

  it('should set the theme with favicon.png', function() {
    var appUseSpy = sinon.spy(appMock, 'use');
    var exception = false;
    faviconMock = function(path) {
      if (path.indexOf('favicon.png') > -1) {
        return 'favicon';
      } else {
        throw new Error();
      }
    };
    themible = proxyquire('../../lib/themible', {
      'serve-favicon': faviconMock,
      'serve-static': serveStaticMock,
      'less-middleware': lessMock,
      './l10n': l10nmiddMock
    });
    var themePath = '/themePath';
    try {
      themible(appMock, path.join(__dirname, 'testThemes',
          'theme2'), '/themePath');
    } catch (err) {
      exception = true;
    } finally {
      expect(exception).to.be.false;
      expect(appUseSpy.callCount).to.be.equal(4);
      expect(appUseSpy.withArgs('favicon').calledOnce).to.be.true;
      expect(appUseSpy.withArgs(themePath, 'less').calledOnce).to.be.true;
      expect(appUseSpy.withArgs(themePath, 'static').calledOnce).to.be.true;
      expect(appUseSpy.withArgs('l10n').calledOnce).to.be.true;
    }
  });

  it('should set the theme without favicon', function() {
    var appUseSpy = sinon.spy(appMock, 'use');
    var exception = false;
    faviconMock = function(path) {
      throw new Error();
    };
    themible = proxyquire('../../lib/themible', {
      'serve-favicon': faviconMock,
      'serve-static': serveStaticMock,
      'less-middleware': lessMock,
      './l10n': l10nmiddMock
    });
    var themePath = '/themePath';
    try {
      themible(appMock, path.join(__dirname, 'testThemes',
          'theme2'), '/themePath');
    } catch (err) {
      exception = true;
    } finally {
      expect(exception).to.be.false;
      expect(appUseSpy.callCount).to.be.equal(3);
      expect(appUseSpy.withArgs(themePath, 'less').calledOnce).to.be.true;
      expect(appUseSpy.withArgs(themePath, 'static').calledOnce).to.be.true;
      expect(appUseSpy.withArgs('l10n').calledOnce).to.be.true;
    }
  });

});
