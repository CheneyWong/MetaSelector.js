# 使用文档

## 导入
nodejs 直接
```
const Selector = require('../dist/index')
```

浏览器中使用全局变量 `MetaSelector`



## 方法
### match

```
Selector.match("[test]", { test : "test" })
```


```
Selector.match("[test]", "http://xxx.com?test=test" )
```


## select

