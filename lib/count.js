/* eslint no-use-before-define: 0 */
'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _css = require('css');

var _css2 = _interopRequireDefault(_css);

var _constants = require('./constants');

var _fsUtils = require('./fs-utils');

function count(ast) {
  function countRules(rules) {
    return rules.reduce(function (acc, rule) {
      return acc + count(rule);
    }, 0);
  }

  switch (ast.type) {
    case 'stylesheet':
      return countRules(ast.stylesheet.rules);
    case 'rule':
      return ast.selectors.length;
    // Don't affect selector limit
    case 'comment':
    case 'charset':
    case 'page':
    case 'font-face':
    case 'keyframes':
    case 'import':
    case 'supports':
      return 0;
    default:
      return countRules(ast.rules);
  }
}

function countFile(filepath, options) {
  return _fsPromise2['default'].readFile(filepath, { encoding: 'utf8' }).then(function (contents) {
    var ast = _css2['default'].parse(contents);
    var selectorCount = count(ast);

    return {
      filepath: filepath,
      selectorCount: selectorCount,
      exceedsLimit: selectorCount > _constants.SELECTOR_LIMIT
    };
  });
}

function countPath(filepath, options) {
  options = options || {};

  return (0, _fsUtils.expand)(filepath).filter(function (x) {
    return (/\.css$/.test(x)
    );
  }).map(function (x) {
    return countFile(x, options);
  }).flatMap(function (x) {
    if (options.progress) {
      options.progress(x.filepath);
    }

    return x;
  }).reduce(function (acc, x) {
    return acc.concat([x]);
  }, []).toPromise(_Promise);
}

exports['default'] = {
  count: count,
  countPath: countPath
};
module.exports = exports['default'];