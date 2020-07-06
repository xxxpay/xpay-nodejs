'use strict';

var utils = require('./utils');

module.exports = _Error;

/**
 * Generic Error klass to wrap any errors returned by xpay-node
 */
function _Error(_raw) {
  this.populate.apply(this, arguments);
  this.stack = (new Error(this.message)).stack;
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function(type, message) {
  this.type = type;
  this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error klass
 * (Specifically for errors returned from XPay's REST API)
 */
var XPayError = _Error.XPayError = _Error.extend({
  type: 'XPayError',
  populate: function(raw) {
    // Move from prototype def (so it appears in stringified obj)
    this.type = this.type;

    this.stack = (new Error(raw.message)).stack;
    this.rawType = raw.type;
    this.code = raw.code;
    this.param = raw.param;
    this.message = raw.message;
    this.detail = raw.detail;
    this.raw = raw;
  }
});

/**
 * Helper factory which takes raw xpay errors and outputs wrapping instances
 */
XPayError.generate = function(rawXPayError) {
  switch (rawXPayError.type) {
  case 'invalid_request_error':
    return new _Error.XPayInvalidRequestError(rawXPayError);
  case 'api_error':
    return new _Error.XPayAPIError(rawXPayError);
  case 'channel_error':
    return new _Error.XPayChannelError(rawXPayError);
  }

  return new _Error('Generic', 'Unknown Error');
};

// Specific XPay Error types:
_Error.XPayInvalidRequestError = XPayError.extend({ type: 'XPayInvalidRequest' });
_Error.XPayAPIError = XPayError.extend({ type: 'XPayAPIError' });
_Error.XPayAuthenticationError = XPayError.extend({ type: 'XPayAuthenticationError' });
_Error.XPayConnectionError = XPayError.extend({ type: 'XPayConnectionError' });
_Error.XPayChannelError = XPayError.extend({ type: 'XPayChannelError'});
_Error.XPayRateLimitError = XPayError.extend({ type: 'XPayRateLimitError'});
