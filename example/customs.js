// XPay Server SDK
// 说明：
// 以下代码只是为了方便商户测试而提供的样例代码，商户可根据自己网站需求按照技术文档编写, 并非一定要使用该代码。
// API接入文档：https://pay.lucfish.com ，文档可筛选后端语言和接入渠道。
// 该代码仅供学习和研究 XPay SDK 使用，仅供参考。

// api_key 获取方式：登录 [Dashboard](https://dashboard.pay.lucfish.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC"
// app_id 获取方式：登录 [Dashboard](https://dashboard.pay.lucfish.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = "app_1Gqj58ynP0mHeX1q"
// 设置 api_key
var xpay = require('../lib/xpay')(API_KEY);
xpay.setPrivateKeyPath(__dirname + '/your_rsa_private_key.pem');

/* 创建海关报关 */
xpay.customs.create({
  app: APP_ID,
  charge: "ch_bLWP80Ci9S4ODaXLSKLOGe5S", // CHARGE ID
  channel: "upacp", // 支付渠道
  trade_no: new Date().getTime().toString(), // 用户报关订单号
  customs_code: "GUANGZHOU", // 报关渠道
  amount: 100, // 报关金额
  transport_amount: 0, // 订单物流金额
  is_split: false, // 是否拆单
  extra: {
    pay_account: "1234567890", // 用户支付账户（商户系统中用户id）
    certif_type: "02", // 证件类型，取值范围参考："01"：身份证；"02"：军官证；"03"：护照；"04"：回乡证；"05"：台胞证；"06"：警官证 "07"：士兵证； "99"：其它证件。
    customer_name: "A Name", // 用户姓名
    certif_id: "ID Card No", // 用户证件号
    tax_amount: "10" // 税费的金额
  }
}, function (err, transfer) {
  if (err != null) {
    console.log("xpay.transfers.create fail:", err)
  }
  // YOUR CODE
});

/* 查询 */
xpay.customs.retrieve(
  "14201609291525440636", // CUSTOMS ID
  function (err, transfer) {
    if (err != null) {
      console.log("xpay.transfers.retrieve fail:", err)
    }
    // YOUR CODE
  }
);
