'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'identification',

  identify: xpayMethod({
    method: 'POST',
  })

});
