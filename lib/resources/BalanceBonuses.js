'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'apps/{appId}/balance_bonuses',

  create: xpayMethod({
    method: 'POST',
    urlParams: ['appId']
  }),

  retrieve: xpayMethod({
    method: 'GET',
    path: '/{id}',
    urlParams: ['appId', 'id']
  }),

  list: xpayMethod({
    method: 'GET',
    urlParams: ['appId']
  })

});
