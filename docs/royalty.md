# 分润

### 批量更新分润对象
``` js
xpay.royalties.batchUpdate(
  {
    'ids': ['411170614151400001'],    // 分润 ID 列表, 必传
    'method': null,                   // 手动标记结算: manual 或 取消手动标记结算：null, 可选
    'description': 'Your description'
  },
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);
```


### 查询分润对象
``` js
xpay.royalties.retrieve(
  '411170614151400001', // royalties ID
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
  }
);
```


### 查询分润对象列表
``` js
xpay.royalties.list(
  { page: 1, per_page: 3 },
  function(err, data) {
    // YOUR CODE
    if (err != null){
      console.log(err);
    }
    console.log(data);
  }
);
```
