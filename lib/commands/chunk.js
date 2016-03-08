'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('colors');

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _commonYargs = require('./common-yargs');

var _commonYargs2 = _interopRequireDefault(_commonYargs);

var _index = require('../index');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _fsUtils = require('../fs-utils');

function executeChunk(input, outputDir, chunkOptions) {
  var basename = _path2['default'].basename(input, '.css');

  return (0, _index.chunkFile)(input, chunkOptions).then(function (_ref) {
    var data = _ref.data;
    var maps = _ref.maps;
    var totalSelectorCount = _ref.totalSelectorCount;

    var chunkData = data.map(function (ast, index) {
      var outputFilename = _path2['default'].join(outputDir, basename + '.' + index + '.css');

      return _fsPromise2['default'].writeFile(outputFilename, ast);
    });

    var sourcemaps = maps.map(function (sourcemap, index) {
      var outputFilename = _path2['default'].join(outputDir, basename + '.' + index + '.css.map');

      return _fsPromise2['default'].writeFile(outputFilename, JSON.stringify(sourcemap));
    });

    return _Promise.all([chunkData, sourcemaps]).then(function (_ref2) {
      var _ref22 = _slicedToArray(_ref2, 2);

      var chunks = _ref22[0];
      var __ = _ref22[1];
      return chunks;
    });
  });
}

function execute(options) {
  return (0, _fsUtils.expand)(options.input).filter(function (x) {
    return (/\.css$/.test(x)
    );
  }).map(function (filepath) {
    var outputDir = options.outDir;

    return (0, _fsUtils.ensureDir)(outputDir).then(function () {
      return executeChunk(filepath, outputDir, { sourcemaps: options.sourcemaps });
    });
  }).flatMap(function (x) {
    return x;
  }).reduce(function (acc, x) {
    return acc.concat([x]);
  }, []).toPromise(_Promise).then(function () {
    console.log('Complete'.green);
    return 0;
  });
}

function yargsSetup() {
  _yargs2['default'].command('chunk', 'breaks up css file to multiple files if it exceeds IE selector limits');
}

function examples() {
  _yargs2['default'].example('$0 chunk <input file|directory>   (chunked files will reside next to input css files with the format *.##.css)');
  _yargs2['default'].example('$0 chunk <input file|directory> --out-dir <output directory>');
  _yargs2['default'].example('$0 chunk <input file|directory> --sourcemaps');
}

function parseArgs(argv) {
  _yargs2['default'].reset();

  (0, _commonYargs2['default'])();
  examples();

  var options = _yargs2['default'].help('h').alias('h', 'help').options({
    'out-dir': {
      description: 'output directory',
      type: 'string'
    },
    'sourcemaps': {
      description: 'ouput sourcemaps',
      type: 'boolean'
    }
  }).parse(argv);

  if (options.help) {
    return options;
  }

  options.input = options._.length > 0 ? options._[0] : null;

  if (!options.input) {
    throw 'No input provided';
  }

  options.input = _path2['default'].resolve(options.input);

  if (!options.outDir) {
    if (_fs2['default'].statSync(options.input).isDirectory()) {
      options.outDir = options.input;
    } else {
      options.outDir = _path2['default'].dirname(options.input);
    }
  } else {
    options.outDir = _path2['default'].resolve(options.outDir);
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