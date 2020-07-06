'use strict';

var XPayResource = require('../XPayResource');

module.exports = XPayResource.extend({

  path: 'red_envelopes',

  includeBasic: [
    'create', 'list', 'retrieve'
  ],

});
