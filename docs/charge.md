# 支付退款

### 支付
``` js
xpay.payments.create({
  order_no:  "123456789",
  app:       { id: "APP_ID"},
  channel:   channel,
  amount:    100,
  client_ip: "127.0.0.1",
  currency:  "cny",
  subject:   "Your Subject",
  body:      "Your Body",
  extra:     extra
}, function(err, charge) {
  // YOUR CODE
});
```

### 查询
``` js
xpay.payments.retrieve(
  "CHARGE_ID",
  function(err, charge) {
    // YOUR CODE
  }
);
```
``` js
xpay.payments.list(
  { limit: 5 },
  function(err, payments) {
    // YOUR CODE
  }
);
```

### 退款
``` js
xpay.payments.createRefund(
  "CHARGE_ID",
  { amount: 100, description: "Refund Description" },
  function(err, refund) {
    // YOUR CODE
  }
);
```

### 退款查询
``` js
xpay.payments.retrieveRefund(
  "CHARGE_ID",
  "REFUND_ID",
  function(err, refund) {
    // YOUR CODE
  }
);
```
``` js
xpay.payments.listRefunds(
  "CHARGE_ID",
  { limit: 5 },
  function(err, refunds) {
    // YOUR CODE
  }
);
```
