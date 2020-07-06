// api_key 获取方式：登录 [Dashboard](https://dashboard.pay.lucfish.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = 'sk_test_ibbTe5jLGCi5rzfH4OqPW9KC';
// 设置 api_key
var xpay = require('../../lib/xpay')(API_KEY);
var path = require('path');

xpay.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/**
 * 查询分润结算明细列表
 */
xpay.royaltyTransactions.list({
    page: 1,
    per_page: 3
  },
  function (err, data) {
    // YOUR CODE
    if (err != null) {
      console.log(err);
    }
    console.log(data);
  }
);

/**
 * 查询分润结算明细
 */
xpay.royaltyTransactions.retrieve(
  '441170612143400001', // royaltyTransactions ID
  function (err, data) {
    // YOUR CODE
    if (err != null) {
      console.log(err);
    }
    console.log(data);
  }
);
