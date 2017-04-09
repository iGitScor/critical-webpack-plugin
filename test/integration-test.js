'use strict';

const fs = require('fs');
const path = require('path');
const expect = require('expect.js');
const webpack = require('webpack');

const config = require('../workflow_test/generate-critical.webpack.config.js');

let stat;
let error;
const compiler = webpack(config);

describe('Webpack workflow test cases', function testcase() {
  this.timeout(50000);

  before((done) => {
    compiler.run((err, stats) => {
      error = err;
      stat = stats;

      return done();
    });
  });

  it('should make new build', () => {
    expect(error).to.be(null);
    expect(stat).to.not.be.empty();
  });

  it('sould generate critical css files', () => {
    expect(fs.existsSync(path.resolve('./build/generate-critical/main.css')))
      .to.be(true);
  });
});
