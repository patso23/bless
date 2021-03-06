/* eslint no-use-before-define: 0 */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

function expanddir(dir) {
  var fullDirPath = _path2['default'].resolve(dir);
  var paths = _fsPromise2['default'].readdir(dir);

  return _rx2['default'].Observable.fromPromise(paths).flatMap(function (x) {
    return x;
  }).map(function (filename) {
    var filepath = _path2['default'].join(fullDirPath, filename);

    return expand(filepath);
  }).flatMap(function (x) {
    return x;
  });
}

function expand(filepath) {
  var fullPath = _path2['default'].resolve(filepath);
  var p = _fsPromise2['default'].stat(fullPath);

  return _rx2['default'].Observable.fromPromise(p).flatMap(function (stat) {
    if (stat.isDirectory()) {
      return expanddir(fullPath);
    } else {
      return _rx2['default'].Observable.just(fullPath);
    }
  });
}

function ensureDir(dir) {
  return _fsPromise2['default'].exists(dir).then(function (exists) {
    if (exists) {
      return null;
    }

    return _fsPromise2['default'].mkdir(dir);
  });
}

exports['default'] = {
  expand: expand,
  ensureDir: ensureDir
};
module.exports = exports['default'];