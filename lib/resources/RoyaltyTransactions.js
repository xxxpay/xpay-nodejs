'use strict';

var XPayResource = require('../XPayResource');

module.exports = XPayResource.extend({

  path: 'royalty_transactions',

  includeBasic: [
    'list', 'retrieve'
  ],

});
