// api_key 获取方式：登录 [Dashboard](https://dashboard.pay.lucfish.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';

// 设置 api_key
var xpay = require('../../lib/xpay')(API_KEY);
var path = require('path');

xpay.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/* 取消 */
xpay.transfers.cancel(
  'tr_uHWX58DanDOGCKOynHvPirfT',
  function (err, transfer) {
    if (err != null) {
      console.log('xpay.transfers.cancel failed: ', err);
    } else {
      console.log(transfer);
    }
    // YOUR CODE
  }
);
