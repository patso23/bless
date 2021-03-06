'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _commonYargs = require('./common-yargs');

var _commonYargs2 = _interopRequireDefault(_commonYargs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _count = require('../count');

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _formatNumber = require('format-number');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _columnify = require('columnify');

var _columnify2 = _interopRequireDefault(_columnify);

var _constants = require('../constants');

var formatNumber = (0, _formatNumber2['default'])();

function format(results, srcPath) {
  var formattedData = results.map(function (x) {
    var color = x.exceedsLimit ? _colors2['default'].red : _colors2['default'].green;
    var relativeFilepath = _path2['default'].relative(srcPath, x.filepath);
    var formattedNumber = formatNumber(x.selectorCount);

    return {
      filepath: color(relativeFilepath),
      selectorCount: color(formattedNumber)
    };
  });

  var formattedResults = (0, _columnify2['default'])(formattedData, {
    columnSplitter: '    ',
    config: {
      filepath: {
        headingTransform: function headingTransform() {
          return 'File Path'.bold.underline;
        }
      },
      selectorCount: {
        headingTransform: function headingTransform() {
          return ('Selector Count (Limit: ' + _constants.SELECTOR_LIMIT + ')').bold.underline;
        }
      }
    }
  });

  return formattedResults;
}

function execute(options) {
  var srcPath = _path2['default'].resolve(options.input);

  var countOptions = {
    progress: function progress(filepath) {
      process.stdout.write('.');
    }
  };

  return (0, _count.countPath)(srcPath, countOptions).then(function (results) {
    console.log('');
    var formattedResults = format(results, srcPath);
    console.log(formattedResults);

    if (_lodash2['default'].any(results, 'exceedsLimit')) {
      return 1;
    }

    return 0;
  });
}

function yargsSetup() {
  _yargs2['default'].command('count', 'checks an existing css file and fails if the selector count exceeds IE limits');
}

function examples() {
  _yargs2['default'].example('$0 count <file|directory>');
  _yargs2['default'].example('$0 count <file|directory> --no-color');
}

function parseArgs(argv) {
  _yargs2['default'].reset();

  (0, _commonYargs2['default'])();
  examples();

  var options = _yargs2['default'].help('h').alias('h', 'help').option('c', {
    alias: 'color',
    'default': true,
    description: 'Colored output',
    type: 'boolean'
  }).parse(argv);

  options.input = options._.length > 0 ? options._[0] : null;

  if (!options.input) {
    throw 'No input provided';
  }

  return options;
}

exports['default'] = {
  execute: execute,
  examples: examples,
  yargsSetup: yargsSetup,
  parseArgs: parseArgs
};
module.exports = exports['default'];