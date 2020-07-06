'use strict'

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({
    path: 'apps',
	includeBasic: [
		'retrieve', 'create', 'update', 'delete', 'list'
	]
})
