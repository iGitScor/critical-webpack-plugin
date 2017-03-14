'use strict';

const path = require('path');
const critical = require('critical');
const urlValidator = require('valid-url');
const request = require('sync-request');

module.exports = class CriticalWebpackPlugin {
  constructor(criticalOptions, options) {
    options = options || {};

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

  apply(compiler) {
    const that = this;
    compiler.plugin('emit', (compilation, callback) => {
      const assetName = path.basename(that.criticalOptions.dest);
      delete that.criticalOptions.dest;

      if (CriticalWebpackPlugin.hasToFetchContent(this.criticalOptions.src)) {
        that.hydrateWithExternalContent();
      }

      critical.generate(that.criticalOptions).then((output) => {
        compilation.assets[assetName] = {
          source: () => output,
          size: () => output.length,
        };

        callback();
      });
    });
  }
};
