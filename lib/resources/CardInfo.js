'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'card_info',

  query: xpayMethod({
    method: 'POST',
  })

});
