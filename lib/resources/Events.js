'use strict';

var XPayResource = require('../XPayResource');

module.exports = XPayResource.extend({

  path: 'events',
  includeBasic: [
    'retrieve'
  ],

});
