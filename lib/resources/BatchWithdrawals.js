'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'apps/{appId}/batch_withdrawals',

  create: xpayMethod({
    method: 'POST',
    path: '',
    urlParams: ['appId']
  }),

  retrieve: xpayMethod({
    method: 'GET',
    path: '/{batchWithdrawalId}',
    urlParams: ['appId', 'batchWithdrawalId']
  }),

  list: xpayMethod({
    method: 'GET',
    urlParams: ['appId']
  })

});
