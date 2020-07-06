'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'royalties',

  includeBasic: [
    'list', 'retrieve'
  ],

  batchUpdate: xpayMethod({
    method: 'PUT'
  }),

});
