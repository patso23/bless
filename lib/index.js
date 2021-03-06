'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _chunk = require('./chunk');

var _chunk2 = _interopRequireDefault(_chunk);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function defaultOptions(options) {
  var _defaultOptions = {
    sourcemaps: false
  };

  if (_lodash2['default'].isUndefined(options)) {
    options = {};
  }

  return _lodash2['default'].defaults(options, _defaultOptions);
}

function chunk(code, options) {
  return (0, _chunk2['default'])(code, defaultOptions(options));
}

function chunkFile(filepath, options) {
  return _fsPromise2['default'].readFile(filepath, { encoding: 'utf8' }).then(function (code) {
    var chunkOptions = _lodash2['default'].defaults(options, { source: filepath });
    return chunk(code, chunkOptions);
  });
}

exports['default'] = {
  chunk: chunk,
  chunkFile: chunkFile
};
module.exports = exports['default'];