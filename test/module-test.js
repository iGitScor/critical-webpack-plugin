'use strict';

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

describe('CriticalWebpackPlugin plugin', function testcase() {
  this.timeout(50000);

  beforeEach(() => {
    critical = new CriticalWebpackPlugin(JSON.parse(JSON.stringify(options)));
  });

  it('can be instantiated', () => {
    expect(typeof critical).to.equal('object');
  });

  it('should throw error when no parameters', () => {
    const noParamConstructor = () => {
      // eslint-disable-next-line no-new
      new CriticalWebpackPlugin();
    };

    expect(noParamConstructor).to.throwException(/Parameters are invalid/);
  });

  it('should have default options', () => {
    expect(critical.silent).to.equal(true);
    expect(critical.verbose).to.equal(false);
  });

  it('can be called in webpack (use of webpack-mock)', () => {
    critical.apply(webpackMock);
  });

  it('can fetch content if the source is a remote URL', () => {
    delete critical.criticalOptions.base;
    critical.criticalOptions.src = 'http://iscor.me';

    critical.apply(webpackMock);
  });

  it('should wrap css content', () => {
    const bufferCSS = Buffer.from('p { color: red; }', 'utf8');
    expect(CriticalWebpackPlugin.hasToWrapStyle(bufferCSS)).to.equal(true);
  });

  it('should not wrap html content', () => {
    let bufferHTML = Buffer.from('<div class="test">Div content</div>', 'utf8');
    expect(CriticalWebpackPlugin.hasToWrapStyle(bufferHTML)).to.equal(false);

    bufferHTML = Buffer.from('<br>', 'utf8');
    expect(CriticalWebpackPlugin.hasToWrapStyle(bufferHTML)).to.equal(false);

    bufferHTML = Buffer.from('<html><head><style>p { color: blue; }</style></head></html>');
    expect(CriticalWebpackPlugin.hasToWrapStyle(bufferHTML)).to.equal(false);
  });
});
