// XPay Server SDK
// 说明：
// 以下代码只是为了方便商户测试而提供的样例代码，商户可根据自己网站需求按照技术文档编写, 并非一定要使用该代码。
// API接入文档：https://pay.lucfish.com ，文档可筛选后端语言和接入渠道。
// 该代码仅供学习和研究 XPay SDK 使用，仅供参考。

// api_key 获取方式：登录 [Dashboard](https://dashboard.pay.lucfish.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC";
// app_id 获取方式：登录 [Dashboard](https://dashboard.pay.lucfish.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = "app_1Gqj58ynP0mHeX1q";
// 设置 api_key
var xpay = require('../../lib/xpay')(API_KEY);
var path = require('path');

xpay.setPrivateKeyPath(path.join(__dirname, '../your_rsa_private_key.pem'));

/**
 * 创建订单
 */
xpay.orders.create({
  merchant_order_no: new Date().getTime().toString(), // 推荐使用 8-20 位，要求数字或字母，不允许其他字符
  app: APP_ID, // APP ID
  uid: "123", // 支付使用的第三方支付渠道取值，请参考：https://pay.lucfish.com/api#api-c-new
  amount: 100, //订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
  client_ip: "127.0.0.1", // 发起支付请求客户端的 IP 地址，格式为 IPV4，如: 127.0.0.1
  currency: "cny", // 仅支持人民币 cny
  subject: "Your Subject",
  body: "Your Body"
}, function (err, order) {
  if (err != null) {
    console.log("xpay.orders.create fail:", err)
  }
  // YOUR CODE
});

/**
 * 查询 order 列表
 */
xpay.orders.list({
    page: 1,
    app: APP_ID
  },
  function (err, order) {
    if (err != null) {
      console.log("xpay.orders.retrieve fail:", err)
    }
    // YOUR CODE
  }
);

/**
 * 查询单个 order
 */
xpay.orders.retrieve(
  // 通过 order 对象的 id 查询一个已创建的 order 对象
  "2001709010000002851", // ORDER ID
  function (err, order) {
    if (err != null) {
      console.log("xpay.orders.retrieve fail:", err)
    }
    // YOUR CODE
  }
);


/**
 *  标记订单为支付状态
 */
//请求参数的 extra 对应各渠道的取值规则请查看 payment_extra 相应方法内说明
var payment_extra = require('../payment_extra');
var channel = 'alipay'; // 支付使用的第三方支付渠道取值，请参考：https://pay.lucfish.com/api#api-c-new
var extra = payment_extra(channel);
xpay.orders.pay(
  "2001709010000002851", {
    "channel": channel, // 支付渠道
    "payment_amount": 100, // 使用 payment 支付金额
    "extra": extra
  },
  function (err, order) {
    if (err != null) {
      console.log("xpay.orders.pay fail:", err)
    }
    // YOUR CODE
  }
);

/**
 * 查询订单中 Payment 对象
 */
xpay.orders.retrievePayment(
  "2001708220000221911", //  orderId
  "ch_88mbTKu9mbn9mfT4KSCiHiX5", // paymentId
  function (err, payment) {
    if (err != null) {
      console.log("xpay.orders.retrievePayment fail:", err)
    }
    // YOUR CODE
  }
);

/**
 * 查询订单中 Payment 列表
 */
xpay.orders.listPayments(
  "2001708220000221911", //  orderId
  {
    'page': 1,
    'per_page': 3
  },
  function (err, payments) {
    if (err != null) {
      console.log("xpay.orders.listPayments fail:", err)
    }
    // YOUR CODE
  }
);

/**
 * 创建订单->取消订单
 */
xpay.orders.create({
  merchant_order_no: new Date().getTime().toString(), // 推荐使用 8-20 位，要求数字或字母，不允许其他字符
  app: APP_ID,
  uid: "123", // 支付使用的第三方支付渠道取值，请参考：https://pay.lucfish.com/api#api-c-new
  amount: 100, //订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
  client_ip: "127.0.0.1", // 发起支付请求客户端的 IP 地址，格式为 IPV4，如: 127.0.0.1
  currency: "cny", // 仅支持人民币 cny
  subject: "Your Subject", // 商品的标题
  body: "Your Body" // 商品的描述信息
}, function (err, order) {
  if (err != null) {
    console.log("xpay.orders.create fail:", err)
  }
  /* 取消订单 */
  xpay.orders.cancel(
    order.id,
    function (err, order) {
      if (err != null) {
        console.log("xpay.orders.cancel fail:", err)
      }
      // YOUR CODE
    }
  )
});
