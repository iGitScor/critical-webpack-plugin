const critical = require('critical');

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

  execute() {
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
