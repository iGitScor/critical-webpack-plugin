'use strict';

const path = require('path');
const CriticalWebpackPlugin = require('../index');

const criticalOptions = {
  src: 'http://iscor.me',
  dest: '../build/fetch-content/main.css',
  css: ['node_modules/normalize.css/normalize.css'],
  width: 480,
  height: 800,
};

module.exports = {
  output: {
    path: path.join(process.cwd(), 'build', 'fetch-content'),
    filename: '[name].js',
  },

  plugins: [
    new CriticalWebpackPlugin(criticalOptions, { silent: false }),
  ],
};
