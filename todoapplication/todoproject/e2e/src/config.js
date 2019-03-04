exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine',
  specs: ['./e2e/src/app.e2e-spec.ts'],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
