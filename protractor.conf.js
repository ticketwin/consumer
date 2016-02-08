var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

exports.config = {
  specs: [
    "app/**/*.e2e.js"
  ],
  multiCapabilities: [
    { "browserName": "chrome" },
    { "browserName": "firefox" }
  ],
  onPrepare: function() {
    expect = chai.expect;
  }
};
