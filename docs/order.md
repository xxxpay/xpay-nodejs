# 账户订单

### 创建订单
``` js 
xpay.orders.create({
  merchant_order_no: "12345678",// 推荐使用 8-20 位，要求数字或字母，不允许其他字符
  app: "APP_ID" ,
  uid:   "123",// 支付使用的第三方支付渠道取值，请参考：https://pay.lucfish.com/api#api-c-new
  amount:    100,//订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
  client_ip: "127.0.0.1",// 发起支付请求客户端的 IP 地址，格式为 IPV4，如: 127.0.0.1
  currency:  "cny",
  subject:   "Your Subject",
  body:      "Your Body",
}, function(err, order) {
  // YOUR CODE
});
```

### 查询订单
``` js
xpay.orders.list(
  { page: 1 ,app:"APP_ID"},
  function(err, order) {
    // YOUR CODE
  }
);

xpay.orders.retrieve(
  // 通过 order 对象的 id 查询一个已创建的 order 对象
  "ORDER_ID",
  function(err, order) {
    // YOUR CODE
  }
);
```

### 标记订单为支付状态
``` js
xpay.orders.pay(
  "ORDER_ID",
  {
    "channel":"alipay",
    "charge_amount": 100,
  },
  function(err, order) {
    // YOUR CODE
  }
)
```

### 取消订单 */
``` js
xpay.orders.cancel(
  order.id,
  function(err, order) {
    // YOUR CODE
  }
)
```

### 订单退款
``` js
xpay.orders.createRefund(
  "ORDER_ID",
  {
    "description":"test-refund"
  },
  function(err, order) {
    // YOUR CODE
  }
)
```

### 查询订单退款
``` js
xpay.orders.retrieveRefund(
  "ORDER_ID",
  "REFUND_ID",
  function(err, order) {
    // YOUR CODE
  }
)
```


### 查询订单中 Charge 对象
``` js
xpay.orders.retrieveCharge(
  "2001708220000221911",          //  orderId
  "ch_88mbTKu9mbn9mfT4KSCiHiX5",  // chargeId
  function(err, charge) {
    if (err!=null){
      console.log("xpay.orders.retrieveCharge fail:",err)
    }
    // YOUR CODE
  }
);
```


### 查询订单中 Payment 列表
``` js
xpay.orders.listPayments(
  "2001708220000221911",          //  orderId
  {'page': 1, 'per_page':3},
  function(err, payments) {
    if (err!=null){
      console.log("xpay.orders.listPayments fail:",err)
    }
    // YOUR CODE
  }
);
```
