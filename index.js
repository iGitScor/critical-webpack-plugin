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

  static hasToWrapStyle(buffer) {
    const content = buffer.toString('utf8');

    const containsHTML = content.match(/<([a-z][a-z0-9]*)\b[^>]*>/gi) !== null;
    const containsStyle = content.match(/(?:\S+\s*{[^}]*})+/gi) !== null;

    return !containsHTML && containsStyle;
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
      const dest = that.criticalOptions.dest;
      const assetName = path.basename(dest);
      delete that.criticalOptions.dest;

      if (CriticalWebpackPlugin.hasToFetchContent(that.criticalOptions.src)) {
        that.hydrateWithExternalContent();
      }

      critical.generate(that.criticalOptions).then((output) => {
        let content = output;
        if (CriticalWebpackPlugin.hasToWrapStyle(content)) {
          content = `<style>${output}</style>`;
        }

        compilation.assets[assetName] = {
          source: () => content,
          size: () => content.length,
        };

        callback();
      });
    });
  }
};
