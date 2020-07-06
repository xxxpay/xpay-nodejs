'use strict';

var XPayResource = require('../XPayResource');

module.exports = XPayResource.extend({

  path: 'payments/{chargeId}/refunds',

  includeBasic: [
    'create', 'list', 'retrieve',
  ],

});
