
'use strict';

var proxyquire = require('proxyquire'),
    path = require('path');

/* jshint -W098 */
describe('i10n Tests', function() {

  it('should call i10nMiddleware', function() {
    var i18Stub = {
      called: false,
      configure: function(options) {
        expect(options.updateFiles).to.be.false;
        expect(options.locales).to.be.equal('locales');
        expect(options.directory).to.be.equal('directory');
        expect(options.objectNotation).to.be.true;
        this.called = true;
      },
      initCalled: false,
      init: function(req, res, next) {
        this.initCalled = true;
        return 'init';
      }
    };

    var i10nMiddleware = proxyquire('../../lib/l10n', {
      'i18n': i18Stub
    });

    i10nMiddleware('locales', 'directory')();
    expect(i18Stub.called).to.be.true;
    expect(i18Stub.initCalled).to.be.true;
  });

  it('should call i10nMiddleware without directory', function() {
    var i18Stub = {
      called: false,
      configure: function(options) {
        expect(options.updateFiles).to.be.false;
        expect(options.locales).to.be.equal('locales');
        expect(options.directory).to.be.equal(path.resolve(__dirname, '../../lib'));
        expect(options.objectNotation).to.be.true;
        this.called = true;
      },
      initCalled: false,
      init: function(req, res, next) {
        this.initCalled = true;
        return 'init';
      }
    };

    var i10nMiddleware = proxyquire('../../lib/l10n', {
      'i18n': i18Stub
    });

    i10nMiddleware('locales')();
    expect(i18Stub.called).to.be.true;
    expect(i18Stub.initCalled).to.be.true;
  });


});
