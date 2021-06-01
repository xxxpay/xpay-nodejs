'use strict';

var XPayResource = require('../XPayResource');

module.exports = XPayResource.extend({

  path: 'payments/{paymentId}/refunds',

  includeBasic: [
    'create', 'list', 'retrieve',
  ],

});
