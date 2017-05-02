'use strict';

const path = require('path');
const CriticalWebpackPlugin = require('../index');

const criticalOptions = {
  inline: true,
  minify: true,
  base: 'test/',
  src: 'index.html',
  dest: 'index-critical.html',
  width: 1300,
  height: 900,
};

module.exports = {
  output: {
    path: path.join(process.cwd(), 'build', 'generate-inline'),
    filename: '[name].js',
  },

  plugins: [
    new CriticalWebpackPlugin(criticalOptions, { silent: false }),
  ],
};
