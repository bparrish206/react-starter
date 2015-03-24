/*
    This acceptance test is triggered by, and based on,
     gulp-selenium-mocha, which uses the wd code here:
    https://github.com/admc/wd
    Selenium / wd API here:
    https://github.com/admc/wd/blob/master/doc/api.md
 */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
/*
   Chai as Promised is not compatible with PhantomJS!
   TODO polyfill for Function.prototype.bind for PhantomJS
   TODO: investigate https://www.npmjs.com/package/chai-webdriver-promised (does not use wd)
 */
chai.use(chaiAsPromised);
var expect = chai.expect;
var port = process.env.PORT || 3000;
var URL = 'http://localhost:' + port;

describe('home page acceptance test', function() {

  it('has title of React Starter', function(done) {
    var browser = this.browser;
    browser.get(URL)
      .then(function() {
      expect(browser.title()).to.become('React Starter').and.notify(done);
    });
  });

  it('has h1.hello with React Starter', function(done) {
    var browser = this.browser;
    browser.get(URL)
      .then(function() {
        return browser.elementByClassName('hello');
      }).then(function(val) {
        expect(val.text()).to.become('Hello React!').and.notify(done);
      });
  });

  after(function(done) {
    var browser = this.browser;
    browser.quit().then(function(){
     done();
   });
  });
});
