# Critical css Webpack plugin

[![Build Status][build-badge]][build]
[![codecov][codecoverage-badge]][codecoverage]
![Node dependency][node-badge]
[![Dependencies][dependencyci-badge]][dependencyci]
[![dependencies Status][dependencies-badge]][dependencies]
[![devDependencies Status][devDependencies-badge]][devDependencies]
[![MIT License][license-badge]][LICENSE]

> Webpack wrapper for critical css generation

Extract critical css from html file, html input or remote URL to load CSS above the fold.

## Installing

```shell
npm i critical-webpack-plugin
```

### Getting started in webpack

**Require `critical-webpack-plugin`**
```javascript
var CriticalWebpackPLugin = require('critical-webpack-plugin')
```

Add the plugin to your plugin list
```javascript
var config = {
  plugins: [
    new CriticalWebpackPlugin({
      base: 'test',
      src: 'index.html',
      dest: '../build/main.css',
      css: ['node_modules/normalize.css/normalize.css'],
      width: 480,
      height: 800,
    })
  ]
}
```

### Configuration

See [critical package](https://www.npmjs.com/package/critical) for options

#### Fetch content

This plugin allows to fetch remotely the content of a web page.

Example:
```javascript
const options = {
  src: 'http://iscor.me',
  dest: '../build/main.css',
  css: ['node_modules/normalize.css/normalize.css'],
  width: 480,
  height: 800,
};
```

**As this plugin is a wrapper, the critical library seems to not accept well a remote url, but the process is done normally.**

## Developing

```shell
git clone https://github.com/{your fork}/critical-webpack-plugin.git
cd critical-webpack-plugin/
npm install
```

Replace `{your fork}` by your github username.

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. All contributions are welcome. Please make a pull request and make sure things still pass after running `npm test`.
Ensure you've read the [contribution guidelines](CONTRIBUTING.md) for more information and respect the [code of conduct](CODE_OF_CONDUCT.md)

### Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/2276944?v=3" width="100px;"/><br /><sub>Sebastien Correaud</sub>](http://twitter.com/iTweetScor)<br />🚇 [💻](https://github.com/iGitScor/critical-webpack-plugin/commits?author=iGitScor) [📖](https://github.com/iGitScor/critical-webpack-plugin/commits?author=iGitScor) [⚠️](https://github.com/iGitScor/critical-webpack-plugin/commits?author=iGitScor) 👀 |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Licensing

The code in this project is licensed under MIT license.

[build-badge]: https://img.shields.io/travis/iGitScor/critical-webpack-plugin.svg?style=flat-square
[build]: https://travis-ci.org/iGitScor/critical-webpack-plugin
[codecoverage-badge]: https://codecov.io/gh/iGitScor/critical-webpack-plugin/branch/master/graph/badge.svg?style=flat-square
[codecoverage]: https://codecov.io/gh/iGitScor/critical-webpack-plugin
[dependencyci-badge]: https://dependencyci.com/github/iGitScor/critical-webpack-plugin/badge?style=flat-square
[dependencyci]: https://dependencyci.com/github/iGitScor/critical-webpack-plugin
[dependencies-badge]: https://david-dm.org/iGitScor/critical-webpack-plugin/status.svg?style=flat-square
[dependencies]: https://david-dm.org/iGitScor/critical-webpack-plugin
[devDependencies-badge]: https://david-dm.org/iGitScor/critical-webpack-plugin/dev-status.svg?style=flat-square
[devDependencies]: https://david-dm.org/iGitScor/critical-webpack-plugin?type=dev
[node-badge]: https://img.shields.io/node/v/critical-webpack-plugin.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/critical-webpack-plugin.svg?style=flat-square
[license]: https://github.com/iGitScor/critical-webpack-plugin/blob/master/LICENSE
