'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'apps/{appId}/coupon_templates',

  create: xpayMethod({
    method: 'POST',
    urlParams: ['appId']
  }),

  list: xpayMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  retrieve: xpayMethod({
    method: 'GET',
    path: '/{Id}',
    urlParams: ['appId', 'id']
  }),

  update: xpayMethod({
    method: 'PUT',
    path: '/{Id}',
    urlParams: ['appId', 'id']
  }),

  delete: xpayMethod({
    method: 'DELETE',
    path: '/{Id}',
    urlParams: ['appId', 'id']
  }),

  createCoupon: xpayMethod({
    method: 'POST',
    path: '/{couponTmplId}/coupons',
    urlParams: ['appId', 'couponTmplId']
  }),

  listCoupons: xpayMethod({
    method: 'GET',
    path: '/{couponTmplId}/coupons',
    urlParams: ['appId', 'couponTmplId']
  }),
});
