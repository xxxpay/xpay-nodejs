# 查询余额结算

### 查询余额结算
``` js
xpay.balanceSettlements.list(
  APP_ID,
  { page: 1, per_page: 3 },
  function(err, datas) {
    // YOUR CODE
  }
);

xpay.balanceSettlements.retrieve(
  APP_ID,
  '670180130750711562240001', // Balance Settlements ID
  function(err, data) {
    // YOUR CODE
  }
);
```
