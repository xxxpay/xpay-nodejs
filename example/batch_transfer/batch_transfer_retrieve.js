// api_key 获取方式：登录 [Dashboard](https://pay.lucfish.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';

// 设置 api_key
var xpay = require('../../lib/xpay')(API_KEY);
var path = require('path');

xpay.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/**
 * 查询单个
 */
xpay.batchTransfers.retrieve(
  // 通过 Transfer 对象的 id 查询一个已创建的 Transfer 对象
  '1801708311830114137',
  function (err, batchTransfer) {
    if (err != null) {
      console.log('xpay.batchTransfers.retrieve failed: ', err);
    } else {
      console.log(batchTransfer);
    }
    // YOUR CODE
  }
);
