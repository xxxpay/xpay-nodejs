'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({
  path: 'apps/{appId}/balance_transactions',

  list: xpayMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  retrieve: xpayMethod({
    method: 'GET',
    path: '/{txnId}',
    urlParams: ['appId', 'txnId']
  }),
});
