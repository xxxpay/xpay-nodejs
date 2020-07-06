'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'apps/{appId}/users',

  create: xpayMethod({
    method: 'POST',
    path: '/{userId}/coupons',
    urlParams: ['appId', 'userId']
  }),

  list: xpayMethod({
    method: 'GET',
    path: '/{userId}/coupons',
    urlParams: ['appId', 'userId']
  }),

  retrieve: xpayMethod({
    method: 'GET',
    path: '/{userId}/coupons/{couponsId}',
    urlParams: ['appId', 'userId', 'couponsId']
  }),

  update: xpayMethod({
    method: 'PUT',
    path: '/{userId}/coupons/{couponsId}',
    urlParams: ['appId', 'userId', 'couponsId']
  }),

  delete: xpayMethod({
    method: 'DELETE',
    path: '/{userId}/coupons/{couponsId}',
    urlParams: ['appId', 'userId', 'couponsId']
  }),
});
