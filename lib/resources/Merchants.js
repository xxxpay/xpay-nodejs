'use strict'

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({
    path: 'merchants',
	includeBasic: [
		'create', 'retrieve', 'update', 'delete', 'list'
	]
})
