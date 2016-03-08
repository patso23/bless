/* eslint no-process-exit: 0 */
'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = cliExeute;

require('colors');

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _parseCliArgs = require('./parse-cli-args');

var _parseCliArgs2 = _interopRequireDefault(_parseCliArgs);

function cliExeute(argv) {
  var command = undefined;

  try {
    command = (0, _parseCliArgs2['default'])(argv);
  } catch (err) {
    console.log(('Failed: ' + err.toString()).red);
    if (err.stack) {
      console.log(err.stack.red);
    }
    console.log('');
    _yargs2['default'].showHelp();
    return _Promise.resolve(1);
  }

  return command.execute(command.options);
}

module.exports = exports['default'];