'use strict';

const path = require('path');
const CriticalWebpackPlugin = require('../index');

const criticalOptions = {
  base: 'test',
  src: 'index.html',
  dest: '../build/generate-critical/main.css.twig',
  css: ['node_modules/normalize.css/normalize.css'],
  minify: true,
  width: 480,
  height: 800,
};

module.exports = {
  output: {
    path: path.join(process.cwd(), 'build', 'generate-include'),
    filename: '[name].js',
  },

  plugins: [
    new CriticalWebpackPlugin(criticalOptions, { silent: false }),
  ],
};
