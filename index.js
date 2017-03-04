const critical = require('critical');
const urlValidator = require('valid-url');
const request = require('sync-request');

module.exports = class CriticalWebpackPlugin {
  constructor(criticalOptions, options = {}) {
    if (CriticalWebpackPlugin.hasValidOptions(criticalOptions)) {
      this.criticalOptions = criticalOptions;

      // Optional parameters
      this.silent = options.silent || true;
      this.verbose = !this.silent;
    } else {
      // Throw exception
      throw new Error('Parameters are invalid');
    }
  }

  static hasValidOptions(options) {
    return typeof options === 'object';
  }

  static hasToFetchContent(source) {
    return urlValidator.isUri(source);
  }

  hydrateWithExternalContent() {
    const externalContentURL = this.criticalOptions.src;
    const externalContent = request('GET', externalContentURL);

    delete this.criticalOptions.src;
    this.criticalOptions.html = externalContent.getBody();
  }

  execute() {
    if (CriticalWebpackPlugin.hasToFetchContent(this.criticalOptions.src)) {
      this.hydrateWithExternalContent();
    }

    critical.generate(this.criticalOptions);

    return true;
  }

  apply(compiler) {
    const that = this;
    compiler.plugin('after-emit', (compilation, callback) => {
      that.execute();
      callback();
    });
  }
};
