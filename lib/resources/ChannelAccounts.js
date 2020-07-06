'use strict'

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({
	path: 'channel_accounts',
	includeBasic: [
		'create', 'retrieve', 'update', 'delete', 'list'
	],
	reverse: xpayMethod({
		method: 'POST',
		path: '/{paymentId}/reverse',
		urlParams: ['paymentId']
	})
})
