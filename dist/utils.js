'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = lookup;

function lookup(obj, field) {
  if (!obj) {
    return null;
  }
  var chain = field.split(']').join('').split('[');
  for (var i = 0, len = chain.length; i < len; i++) {
    var prop = obj[chain[i]];
    if (typeof prop === 'undefined') {
      return null;
    }
    if (typeof prop !== 'object') {
      return prop;
    }
    obj = prop;
  }
  return null;
}

module.exports = exports['default'];