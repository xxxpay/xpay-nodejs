'use strict';

var http = require('http');
var https = require('https');
var path = require('path');
var _ = require('lodash');

var utils = require('./utils');
var Error = require('./Error');

var hasOwn = {}.hasOwnProperty;

// Provide extension mechanism for XPay Resource Sub-Classes
XPayResource.extend = utils.protoExtend;

// Expose method-creator & prepared (basic) methods
XPayResource.method = require('./XPayMethod');
XPayResource.BASIC_METHODS = require('./XPayMethod.basic');

/**
 * Encapsulates request logic for a XPay Resource
 */
function XPayResource(xpay, urlData) {
  this._xpay = xpay;
  this._urlData = urlData || {};

  this.basePath = utils.makeURLInterpolator(xpay.getApiField('basePath'));
  this.path = utils.makeURLInterpolator(this.path);

  if (this.includeBasic) {
    this.includeBasic.forEach(function (methodName) {
      this[methodName] = XPayResource.BASIC_METHODS[methodName];
    }, this);
  }

  this.initialize.apply(this, arguments);
}

XPayResource.prototype = {
  path: '',

  initialize: function () { },

  createFullPath: function (commandPath, urlData) {
    return path.join(
      this.basePath(urlData),
      this.path(urlData),
      typeof commandPath == 'function' ?
        commandPath(urlData) : commandPath
    ).replace(/\\/g, '/'); // ugly workaround for Windows
  },

  createUrlData: function () {
    var urlData = {};
    for (var i in this._urlData) {
      if (hasOwn.call(this._urlData, i)) {
        urlData[i] = this._urlData[i];
      }
    }

    return urlData;
  },

  wrapTimeout: function (promise, callback) {
    return utils.wrapPromiseCallback(promise, callback);
  },

  _timeoutHandler: function (timeout, req, callback) {
    var self = this;
    return function () {
      var timeoutErr = new Error('ETIMEOUT');
      timeoutErr.code = 'ETIMEOUT';

      req._isAborted = true;
      req.abort();

      callback.call(
        self,
        new Error.XPayConnectionError({
          message: 'Request aborted due to timeout being reached (' + timeout + 'ms)',
          detail: timeoutErr
        }),
        null
      );
    };
  },

  _responseHandler: function (req, callback, retryCallback) {
    var self = this;
    return function (res) {
      var response = '';

      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        response += chunk;
      });
      res.on('end', function () {
        try {
          response = JSON.parse(response);
          if (response.error) {
            var err;
            if (res.statusCode === 401) {
              err = new Error.XPayAuthenticationError(response.error);
            } else if (res.statusCode === 403) {
              err = new Error.XPayRateLimitError(response.error);
            } else {
              err = Error.XPayError.generate(response.error);
            }
            return callback.call(self, err, null);
          }
        } catch (e) {
          err = new Error.XPayAPIError({
            message: 'Invalid JSON received from the XPay API',
            response: response,
            exception: e
          });
          if (res.statusCode === 502 && retryCallback) {
            return retryCallback.call(self, err, null);
          }
          return callback.call(self, err, null);
        }
        callback.call(self, null, response);
      });
    };
  },

  _errorHandler: function (req, callback) {
    var self = this;
    return function (error) {
      if (req._isAborted) return; // already handled
      callback.call(
        self,
        new Error.XPayConnectionError({
          message: 'An error occurred with our connection to XPay',
          detail: error.message
        }),
        null
      );
    };
  },

  _request: function (method, path, data, auth, callback) {
    var requestData = '';
    var contentType = 'application/json';
    switch (method) {
      case 'POST':
      case 'PUT':
        requestData = JSON.stringify(data || {});
        break;
      case 'GET':
      case 'DELETE':
        contentType = 'application/x-www-form-urlencoded';
        path = data ? (path + '?' + utils.stringifyRequestData(data)) : path;
        break;
      default:
    }
    var self = this;

    var apiVersion = this._xpay.getApiField('version');
    var headers = {
      'Authorization': auth ?
        'Basic ' + new Buffer(auth + ':').toString('base64') :
        this._xpay.getApiField('auth'),
      'Accept': 'application/json',
      'Content-Type': contentType + '; charset=UTF-8',
      'User-Agent': 'XPay/v1 NodeBindings/'
        + this._xpay.getConstant('PACKAGE_VERSION')
    };

    var requestTime = Date.parse(new Date()) / 1000;
    if (this._xpay.getPrivateKey()) {
      headers['X-Request-Signature'] = utils.generateSign(
        requestData + path + requestTime,
        this._xpay.getPrivateKey()
      );
    }
    headers['X-Request-Timestamp'] = requestTime;

    if (apiVersion) {
      headers['X-Version'] = apiVersion;
    }

    headers = _.assign(headers, this._xpay.getParsedHeaders());

    this._xpay.getClientUserAgent(function (cua) {
      headers['X-XPay-Client-User-Agent'] = cua;
      makeRequest();
    });

    var retryCount = 0;
    var retryMax = 1;
    function makeRequest() {
      var timeout = self._xpay.getApiField('timeout');
      var isInsecureConnection = self._xpay.getApiField('protocol') == 'http';

      var req = (
        isInsecureConnection ? http : https
      ).request({
        host: self._xpay.getApiField('host'),
        port: self._xpay.getApiField('port'),
        path: path,
        method: method,
        headers: headers,
        ciphers: 'DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5'
      });

      req.setTimeout(timeout, self._timeoutHandler(timeout, req, callback));
      req.on('response', self._responseHandler(req, callback, function (err) {
        if (retryCount < retryMax) {
          retryCount++;
          makeRequest();
        } else {
          return callback.call(self, err, null);
        }
      }));
      req.on('error', self._errorHandler(req, callback));

      req.on('socket', function (socket) {
        socket.on(
          isInsecureConnection ? 'connect' : 'secureConnect',
          function () {
            req.write(requestData);
            req.end();
          }
        );
      });
    }
  }
};

module.exports = XPayResource;
