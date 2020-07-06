'use strict';

var XPayResource = require('../XPayResource');
var xpayMethod = XPayResource.method;

module.exports = XPayResource.extend({

  path: 'apps/{appId}/sub_apps',

  create: xpayMethod({
    method: 'POST',
    urlParams: ['appId']
  }),

  list: xpayMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  retrieve: xpayMethod({
    method: 'GET',
    path: '/{subAppId}',
    urlParams: ['appId', 'subAppId']
  }),

  update: xpayMethod({
    method: 'PUT',
    path: '/{subAppId}',
    urlParams: ['appId', 'subAppId']
  }),

  delete: xpayMethod({
    method: 'DELETE',
    path: '/{subAppId}',
    urlParams: ['appId', 'subAppId']
  }),

  createChannel: xpayMethod({
    method: 'POST',
    path: '/{subAppId}/channels',
    urlParams: ['appId', 'subAppId']
  }),

  updateChannel: xpayMethod({
    method: 'PUT',
    path: '/{subAppId}/channels/{channelName}',
    urlParams: ['appId', 'subAppId', 'channelName']
  }),

  retrieveChannel: xpayMethod({
    method: 'GET',
    path: '/{subAppId}/channels/{channelName}',
    urlParams: ['appId', 'subAppId', 'channelName']
  }),

  deleteChannel: xpayMethod({
    method: 'DELETE',
    path: '/{subAppId}/channels/{channelName}',
    urlParams: ['appId', 'subAppId', 'channelName']
  }),

});
