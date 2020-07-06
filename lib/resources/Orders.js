'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'orders',

  includeBasic: [
    'create', 'list', 'retrieve'
  ],

  update: xpayMethod({
    method: 'PUT',
    path: '{id}',
    urlParams: ['id']
  }),

  cancel: function (id, callback) {
    return this.wrapTimeout(this.update(id, {
      'status': 'canceled'
    }), callback);
  },

  pay: xpayMethod({
    method: 'POST',
    path: '/{orderId}/pay',
    urlParams: ['orderId']
  }),

  createRefund: xpayMethod({
    method: 'POST',
    path: '/{orderId}/order_refunds',
    urlParams: ['orderId']
  }),


  listRefunds: xpayMethod({
    method: 'GET',
    path: '/{orderId}/order_refunds',
    urlParams: ['orderId']
  }),

  retrieveRefund: xpayMethod({
    method: 'GET',
    path: '/{orderId}/order_refunds/{refundId}',
    urlParams: ['orderId', 'refundId']
  }),

  retrieveCharge: xpayMethod({
    method: 'GET',
    path: '/{orderId}/payments/{paymentId}',
    urlParams: ['orderId', 'paymentId']
  }),

  listPayments: xpayMethod({
    method: 'GET',
    path: '/{orderId}/payments',
    urlParams: ['orderId']
  })

});
