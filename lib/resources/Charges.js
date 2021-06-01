'use strict';

var XPayResource = require('../XPayResource');
var Error = require('../Error');
var xpayMethod = XPayResource.method;
var hasOwn = {}.hasOwnProperty;

module.exports = XPayResource.extend({

  path: 'payments',

  includeBasic: [
    'create', 'retrieve'
  ],

  list: function (params, callback) {
    if ((!hasOwn.call(params, 'app')
      || typeof params.app != 'object'
      || !hasOwn.call(params.app, 'id'))
      && !hasOwn.call(params, 'app[id]')
    ) {
      return this.wrapTimeout(new Promise(function (resolve, reject) {
        reject(new Error.XPayInvalidRequestError({
          message: 'Please pass app[id] as parameter.'
        }));
      }), callback);
    } else {
      return this.wrapTimeout(xpayMethod({
        method: 'GET'
      }).call(this, params), callback);
    }
  },

  reverse: xpayMethod({
    method: 'POST',
    path: '/{paymentId}/reverse',
    urlParams: ['paymentId'],
  }),

  /**
   * Payment: Refund methods
   */
  createRefund: xpayMethod({
    method: 'POST',
    path: '/{paymentId}/refunds',
    urlParams: ['paymentId'],
  }),

  listRefunds: xpayMethod({
    method: 'GET',
    path: '/{paymentId}/refunds',
    urlParams: ['paymentId']
  }),

  retrieveRefund: xpayMethod({
    method: 'GET',
    path: '/{paymentId}/refunds/{refundId}',
    urlParams: ['paymentId', 'refundId']
  }),

});
