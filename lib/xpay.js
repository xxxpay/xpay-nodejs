'use strict';

XPay.DEFAULT_HOST = 'api.xpay.lucfish.com';
XPay.DEFAULT_PORT = '443';
XPay.DEFAULT_BASE_PATH = '/v1/';
XPay.DEFAULT_API_VERSION = null;

XPay.DEFAULT_TIMEOUT = require('http').createServer().timeout;

XPay.PACKAGE_VERSION = require('../package.json').version;

XPay.USER_AGENT = {
  bindings_version: XPay.PACKAGE_VERSION,
  lang: 'node',
  lang_version: process.version,
  platform: process.platform,
  publisher: 'xpay',
  uname: null
};

XPay.USER_AGENT_SERIALIZED = null;

var exec = require('child_process').exec;

var resources = {
  ChannelAccounts: require('./resources/ChannelAccounts'),
  Merchants: require('./resources/Merchants'),
  Apps: require('./resources/Apps'),
  PaymentRefunds: require('./resources/PaymentRefunds'),
  RedEnvelopes: require('./resources/RedEnvelopes'),
  Payments: require('./resources/Payments'),
  // PaymentRefunds: require('./resources/PaymentRefunds'),
  // RedEnvelopes: require('./resources/RedEnvelopes'),
  Events: require('./resources/Events'),
  Transfers: require('./resources/Transfers'),
  BatchTransfers: require('./resources/BatchTransfers'),
  Identification: require('./resources/Identification'),
  Customs: require('./resources/Customs'),
  BatchRefunds: require('./resources/BatchRefunds'),
  CouponTemplates: require('./resources/CouponTemplates'),
  Users: require('./resources/Users'),
  Orders: require('./resources/Orders'),
  Recharge: require('./resources/Recharges'),
  Coupons: require('./resources/Coupons'),
  BalanceTransactions: require('./resources/BalanceTransactions'),
  Withdrawals: require('./resources/Withdrawals'),
  BatchWithdrawals: require('./resources/BatchWithdrawals'),
  BalanceBonuses: require('./resources/BalanceBonuses'),
  BalanceTransfers: require('./resources/BalanceTransfers'),
  SubApps: require('./resources/SubApps'),
  SettleAccounts: require('./resources/SettleAccounts'),
  Royalties: require('./resources/Royalties'),
  RoyaltySettlements: require('./resources/RoyaltySettlements'),
  RoyaltyTransactions: require('./resources/RoyaltyTransactions'),
  RoyaltyTemplates: require('./resources/RoyaltyTemplates'),
  Agreements: require('./resources/Agreements'),
  BalanceSettlements: require('./resources/BalanceSettlements'),
  CardInfo: require('./resources/CardInfo')
};

var wxOAuth = require('./WxOAuth');
var wxPubOauth = require('./WxPubOauth');
var _ = require('lodash');
var HEADERS_TO_PARSE = ['XPay-One-Version', 'XPay-Sdk-Version'];
var fs = require('fs');

XPay.XPayResource = require('./XPayResource');
XPay.resources = resources;
XPay.wxOAuth = wxOAuth;
XPay.wxPubOauth = wxPubOauth;

function XPay(key, version) {
  if (!(this instanceof XPay)) {
    return new XPay(key, version);
  }

  this._api = {
    auth: null,
    host: XPay.DEFAULT_HOST,
    port: XPay.DEFAULT_PORT,
    basePath: XPay.DEFAULT_BASE_PATH,
    version: XPay.DEFAULT_API_VERSION,
    timeout: XPay.DEFAULT_TIMEOUT,
    dev: false
  };

  this._parsedHeaders = {};
  this._privateKey = null;

  this._prepResources();
  this._prepExtraFuncs();
  this.setApiKey(key);
  this.setApiVersion(version);
}

XPay.prototype = {

  setHost: function (host, port, protocol) {
    this._setApiField('host', host);
    if (port) this.setPort(port);
    if (protocol) this.setProtocol(protocol);
  },

  setProtocol: function (protocol) {
    this._setApiField('protocol', protocol.toLowerCase());
  },

  setPort: function (port) {
    this._setApiField('port', port);
  },

  setApiVersion: function (version) {
    if (version) {
      this._setApiField('version', version);
    }
  },

  setApiKey: function (key) {
    if (key) {
      this._setApiField(
        'auth',
        'Basic ' + new Buffer(key + ':').toString('base64')
      );
    }
  },

  setAppID: function (id) {
    if (id) {
      this._setApiField(
        'appID',
        id
      );
    }
  },

  setTimeout: function (timeout) {
    this._setApiField(
      'timeout',
      timeout == null ? XPay.DEFAULT_TIMEOUT : timeout
    );
  },

  _setApiField: function (key, value) {
    this._api[key] = value;
  },

  getApiField: function (key) {
    return this._api[key];
  },

  getConstant: function (c) {
    return XPay[c];
  },

  getClientUserAgent: function (cb) {
    if (XPay.USER_AGENT_SERIALIZED) {
      return cb(XPay.USER_AGENT_SERIALIZED);
    }
    exec('uname -a', function (err, uname) {
      XPay.USER_AGENT.uname = uname || 'UNKNOWN';
      XPay.USER_AGENT_SERIALIZED = JSON.stringify(XPay.USER_AGENT);
      cb(XPay.USER_AGENT_SERIALIZED);
    });
  },

  setPrivateKey: function (privateKey) {
    this._privateKey = privateKey;
  },

  getPrivateKey: function () {
    return this._privateKey;
  },

  setPrivateKeyPath: function (path) {
    this._privateKey = fs.readFileSync(path, 'utf8');
  },

  _prepResources: function () {

    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    }
  },

  _setParsedHeader: function (key, value) {
    this._parsedHeaders[key] = value;
  },

  getParsedHeaders: function () {
    return this._parsedHeaders;
  },

  _prepExtraFuncs: function () {
    var self = this;
    this['wxOAuth'] = wxOAuth;
    this['wxPubOauth'] = wxPubOauth;
    this['parseHeaders'] = function (headers) {
      if (typeof headers == 'undefined') {
        return;
      }
      for (var k in headers) {
        var key = _.startCase(k.toLowerCase()).replace(/\s/g, '-');
        if (_.indexOf(HEADERS_TO_PARSE, key) != -1) {
          self._setParsedHeader(key, headers[k]);
        }
      }
    };
  }
};

module.exports = XPay;
