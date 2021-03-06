'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = parseCliArgs;

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _packageJson = require('../package.json');

var _commandsCommonYargs = require('./commands/common-yargs');

var _commandsCommonYargs2 = _interopRequireDefault(_commandsCommonYargs);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

var help = {
  options: null,
  execute: _yargs2['default'].showHelp
};

function parseCliArgs(argv) {
  if (argv === process.argv) {
    argv = argv.slice(2);
  }

  (0, _commandsCommonYargs2['default'])(_yargs2['default']);

  _yargs2['default'].version('v' + _packageJson.version).alias('version', 'v').wrap(null);

  _Object$keys(_commands2['default']).map(function (key) {
    return _commands2['default'][key];
  }).forEach(function (x) {
    if (x.yargsSetup) {
      x.yargsSetup();
    }

    if (x.examples) {
      x.examples();
    }
  });

  var commandOptions = _yargs2['default'].parse(argv);

  var command = commandOptions._[0];

  if (!command) {
    if (commandOptions.help) {
      return help;
    }

    throw 'No command provided';
  }

  var options = _commands2['default'][command].parseArgs(argv.slice(1));

  if (commandOptions.help) {
    return help;
  }

  return {
    options: options,
    execute: _commands2['default'][command].execute
  };
}

module.exports = exports['default'];