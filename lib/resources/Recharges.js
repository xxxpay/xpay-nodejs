'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: '/apps/{appId}/recharges',

  create: xpayMethod({
    method: 'POST',
    urlParams: ['appId']
  }),

  retrieve: xpayMethod({
    method: 'GET',
    path: '/{rechargeId}',
    urlParams: ['appId', 'rechargeId']
  }),

  list: xpayMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  createRefund: xpayMethod({
    method: 'POST',
    path: '/{rechargeId}/refunds',
    urlParams: ['appId', 'rechargeId']
  }),

  retrieveRefund: xpayMethod({
    method: 'GET',
    path: '/{rechargeId}/refunds/{refundId}',
    urlParams: ['appId', 'rechargeId', 'refundId']
  }),

  listRefunds: xpayMethod({
    method: 'GET',
    path: '/{rechargeId}/refunds',
    urlParams: ['appId', 'rechargeId']
  })

});
