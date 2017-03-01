const CriticalWebpackPlugin = require('../index.js');
const expect = require('expect.js');
const webpackMock = require('webpack-mock');

let critical;
const options = {
  base: 'test',
  src: 'index.html',
  dest: '../build/main.css',
  css: ['node_modules/normalize.css/normalize.css'],
  width: 480,
  height: 800,
};

describe('CriticalWebpackPlugin plugin', () => {
  beforeEach(() => {
    critical = new CriticalWebpackPlugin(JSON.parse(JSON.stringify(options)));
  });

  it('can be instantiated', () => {
    expect(typeof critical).to.equal('object');
  });

  it('should throw error when no parameters', () => {
    const noParamConstructor = function () {
      // eslint-disable-next-line no-new
      new CriticalWebpackPlugin();
    };

    expect(noParamConstructor).to.throwException(/Parameters are invalid/);
  });

  it('should have default options', () => {
    expect(critical.silent).to.equal(true);
    expect(critical.verbose).to.equal(false);
  });

  it('should extract critical css', () => {
    expect(critical.execute()).to.equal(true);
  });

  it('should apply compiler (webpack-mock)', () => {
    critical.apply(webpackMock);
  });
});
