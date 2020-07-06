'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'apps/{appId}/balance_settlements',

  retrieve: xpayMethod({
    method: 'GET',
    path: '/{balanceSettlementId}',
    urlParams: ['appId', 'balanceSettlementId']
  }),

  list: xpayMethod({
    method: 'GET',
    urlParams: ['appId']
  })
});
