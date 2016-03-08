'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = appendCommon;

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _packageJson = require('../../package.json');

function appendCommon() {
  _yargs2['default'].usage(('BlessCSS v' + _packageJson.version).magenta + ' - Tools to ensure CSS files meet IE 6-9 selector limit restrictions.').epilogue('For additional information see http://blesscss.com').wrap(null);
}

module.exports = exports['default'];