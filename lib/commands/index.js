'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _count = require('./count');

var _count2 = _interopRequireDefault(_count);

var _chunk = require('./chunk');

var _chunk2 = _interopRequireDefault(_chunk);

exports['default'] = {
  count: _count2['default'],
  chunk: _chunk2['default']
};
module.exports = exports['default'];