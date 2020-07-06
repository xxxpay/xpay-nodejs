var XPayResource = require('../XPayResource');

module.exports = XPayResource.extend({

  path: 'customs',

  includeBasic: [
    'create', 'retrieve'
  ],

});
