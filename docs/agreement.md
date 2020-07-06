# 签约

### 创建
``` js
xpay.agreements.create({
  contract_no: '123456789',
  app: 'APP_ID',
  channel: channel,
  extra: extra,
  metadata: {}
}, function(err, agreement) {
  // YOUR CODE
});
```

### 查询
``` js
xpay.agreements.retrieve(
  'AGREEMENT_ID',
  function(err, agreement) {
    // YOUR CODE
  }
);
```
``` js
xpay.agreements.list(
  { app: 'APP_ID', per_page: 3 },
  function(err, agreements) {
    // YOUR CODE
  }
);
```

### 解约
``` js
xpay.agreements.cancel(
  'AGREEMENT_ID',
  function(err, agreement) {
    // YOUR CODE
  }
);
```
