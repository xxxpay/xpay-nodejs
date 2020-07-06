'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'apps/{appId}/balance_transfers',

  create: xpayMethod({
    method: 'POST',
    urlParams: ['appId']
  }),

  retrieve: xpayMethod({
    method: 'GET',
    path: '/{balanceTransferId}',
    urlParams: ['appId', 'balanceTransferId']
  }),

  list: xpayMethod({
    method: 'GET',
    urlParams: ['appId']
  })
});
