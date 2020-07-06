'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'apps/{appId}/withdrawals',

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
  }),

  update: xpayMethod({
    method: 'PUT',
    path: '/{id}',
    urlParams: ['appId', 'id']
  }),

  cancel: function (appId, id, callback) {
    return this.wrapTimeout(this.update(appId, id, {
      'status': 'canceled'
    }), callback);
  },

  confirm: function (appId, id, callback) {
    return this.wrapTimeout(this.update(appId, id, {
      'status': 'pending'
    }), callback);
  },

});
