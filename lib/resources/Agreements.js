'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'agreements',

  includeBasic: [
    'create', 'list', 'retrieve'
  ],

  update: xpayMethod({
    method: 'PUT',
    path: '/{id}',
    urlParams: ['id']
  }),

  cancel: function (id, callback) {
    return this.wrapTimeout(this.update(id, {
      'status': 'canceled'
    }), callback);
  },
});
