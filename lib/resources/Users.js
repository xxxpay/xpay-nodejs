'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'apps/{appId}/users',

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
    path: '/{userId}',
    urlParams: ['appId', 'userId']
  }),

  update: xpayMethod({
    method: 'PUT',
    path: '/{userId}',
    urlParams: ['appId', 'userId']
  }),

});
