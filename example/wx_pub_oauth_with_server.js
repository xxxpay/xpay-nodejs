'use strict';
// api_key 获取方式：登录 [Dashboard](https://dashboard.pay.lucfish.com) -> 点击管理平台右上角公司名称 -> 企业面板 -> 开发参数 -> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';

var http = require('http');
var _url = require('url');
var xpay = require('../lib/xpay')(API_KEY);
http.createServer(function (req, res) {
  var urlParts = _url.parse(req.url, true);
  switch (urlParts.pathname) {
    case '/oauth': // 跳转到微信进行认证
      var oauthUrl = xpay.wxOAuth.createOauthUrlForCode('WX_PUB_APP_ID', 'http://example.com/getopenid?showwxpaytitle=1');
      res.writeHead(302, {
        'Location': oauthUrl
      });
      res.end('');
      break;
    case '/getopenid': // 回调地址，获取 openid
      xpay.wxOAuth.getOpenid('WX_PUB_APP_ID', 'WX_PUB_APP_SECRET', urlParts.query.code, function (err, res) {
        console.log(res.openid);
        // ...
        // pass openid to extra['open_id'] and create a payment
        // ...
      });
      break;
    case '/signature': // 微信公众号获取签名
      xpay.wxOAuth.getJsapiTicket('WX_PUB_APP_ID', 'WX_PUB_APP_SECRET', function (e, response) {
        // response['ticket'] 是获得的 jsapi_ticket，有效期为 7200 秒，需在自己的服务器全局缓存。
        var payment = {
          /* 准备支付的 payment */ };
        var signature = xpay.wxOAuth.getSignature(payment, response['ticket'], 'PAY_PAGE_URL');
        res.writeHead(200);
        res.end(signature);
      });
      break;
    default:
      res.writeHead(404);
      res.end('');
      break;
  }
}).listen(80, '0.0.0.0');
