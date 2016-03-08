'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = chunk;
var marked0$0 = [chunks].map(_regeneratorRuntime.mark);

var _css = require('css');

var _css2 = _interopRequireDefault(_css);

var _count = require('./count');

var _constants = require('./constants');

function createAst(rules, selectorCount) {
  return {
    ast: {
      type: 'stylesheet',
      stylesheet: {
        rules: rules
      }
    },
    selectorCount: selectorCount
  };
}

function chunks(ast) {
  var rules, splitRules, selectorCount, i, rule, ruleSelectorCount;
  return _regeneratorRuntime.wrap(function chunks$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        rules = ast.stylesheet.rules;
        splitRules = [];
        selectorCount = 0;
        i = 0;

      case 4:
        if (!(i < rules.length)) {
          context$1$0.next = 17;
          break;
        }

        rule = rules[i];
        ruleSelectorCount = (0, _count.count)(rule);

        if (!(selectorCount + ruleSelectorCount > _constants.SELECTOR_LIMIT)) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 10;
        return createAst(splitRules, selectorCount);

      case 10:
        splitRules = [];
        selectorCount = 0;

      case 12:

        splitRules.push(rule);
        selectorCount += ruleSelectorCount;

      case 14:
        i++;
        context$1$0.next = 4;
        break;

      case 17:
        context$1$0.next = 19;
        return createAst(splitRules, selectorCount);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

function chunk(code, options) {
  var fullAst = _css2['default'].parse(code, { source: options.source });
  var totalSelectorCount = 0;
  var data = [];
  var maps = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(chunks(fullAst)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value;
      var ast = _step$value.ast;
      var selectorCount = _step$value.selectorCount;

      var stringified = _css2['default'].stringify(ast, { sourcemap: options.sourcemaps });
      totalSelectorCount += selectorCount;
      if (options.source && options.sourcemaps) {
        data.push(stringified.code);
        maps.push(stringified.map);
      } else {
        data.push(stringified);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return { data: data, maps: maps, totalSelectorCount: totalSelectorCount };
}

module.exports = exports['default'];