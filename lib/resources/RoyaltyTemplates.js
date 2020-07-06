'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'royalty_templates',

  includeBasic: [
    'create', 'list', 'retrieve', 'delete'
  ],

  update: xpayMethod({
    method: 'PUT',
    path: '/{id}',
    urlParams: ['id']
  })
});
