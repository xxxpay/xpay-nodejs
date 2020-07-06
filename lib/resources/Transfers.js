'use strict';

var XPayResource = require('../XPayResource');

module.exports = XPayResource.extend({

  path: 'transfers',

  includeBasic: [
    'create', 'list', 'retrieve'
  ],
});
