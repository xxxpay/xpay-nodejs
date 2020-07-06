'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'apps/{appId}/users/{userId}/settle_accounts',

  create: xpayMethod({
    method: 'POST',
    urlParams: ['appId', 'userId']
  }),

  list: xpayMethod({
    method: 'GET',
    urlParams: ['appId', 'userId']
  }),

  retrieve: xpayMethod({
    method: 'GET',
    path: '/{settleAccountId}',
    urlParams: ['appId', 'userId', 'settleAccountId']
  }),

  delete: xpayMethod({
    method: 'DELETE',
    path: '/{settleAccountId}',
    urlParams: ['appId', 'userId', 'settleAccountId']
  }),

});
