'use strict';

/**
 * @file
 * Borrower Check authentication strategy for Passport and Node.js
 * Based on the work done by Jared Hanson in passport-locale -- https://github.com/jaredhanson/passport-local
 */

/**
 * Module dependencies.
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _passportStrategy = require('passport-strategy');

var _passportStrategy2 = _interopRequireDefault(_passportStrategy);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var Strategy = (function (_passport$Strategy) {
  _inherits(Strategy, _passport$Strategy);

  function Strategy(options, verify) {
    _classCallCheck(this, Strategy);

    _get(Object.getPrototypeOf(Strategy.prototype), 'constructor', this).call(this);

    if (typeof options === 'function') {
      verify = options;
      options = {};
    }
    if (!verify) {
      throw new TypeError('BorchkStrategy requires a verify callback');
    }

    this._agencyidField = options.agencyidField || 'agencyid';
    this._loaneridField = options.loaneridField || 'loanerid';
    this._pincodeField = options.pincodeField || 'pincode';

    _passportStrategy2['default'].Strategy.call(this);
    this.name = 'borchk';
    this._verify = verify;
    this._passReqToCallback = options.passReqToCallback;
  }

  /**
   * Authenticate request based on the contents of a form submission.
   *
   * @param {Object} req
   * @param {Object} options
   * @api protected
   */

  _createClass(Strategy, [{
    key: 'authenticate',
    value: function authenticate(req, options) {
      options = options || {};
      var agencyid = (0, _utils2['default'])(req.body, this._agencyidField) || (0, _utils2['default'])(req.query, this._agencyidField);
      var loanerid = (0, _utils2['default'])(req.body, this._loaneridField) || (0, _utils2['default'])(req.query, this._loaneridField);
      var pincode = (0, _utils2['default'])(req.body, this._pincodeField) || (0, _utils2['default'])(req.query, this._pincodeField);

      if (!agencyid || !loanerid || !pincode) {
        return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400);
      }

      var self = this;

      function verified(err, user, info) {
        if (err) {
          return self.error(err);
        }
        if (!user) {
          return self.fail(info);
        }
        self.success(user, info);
      }

      try {
        if (self._passReqToCallback) {
          this._verify(req, agencyid, loanerid, pincode, verified);
        } else {
          this._verify(agencyid, loanerid, pincode, verified);
        }
      } catch (ex) {
        return self.error(ex);
      }
    }
  }]);

  return Strategy;
})(_passportStrategy2['default'].Strategy);

exports['default'] = Strategy;
module.exports = exports['default'];