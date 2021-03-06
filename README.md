# MetaSelector.js
元数据选择器。当前项目为 `javascript` 实现。
- `java` 实现去往这里。
- 构建文档
- 使用文档

用于文件、笔记、物体筛选，服务器规划、微服务调度等众多领域。 规则参考了 CSS 属性选择器，JQuery 属性选择器。便于生成、书写，便于解析、识别，也便于执行。


元数据以属性(attribute) 和值 (value) 的形式描述，包裹在 `[]` 之中。

## 基本选择器
- `[attribute]` 包含某个属性
- `[attribute=undefined]` 不包含某个属性
- `[attribute=value]` 属性等于某值
- `[attribute*=value]` 属性包含某个值
- `[attribute|=value]` 属性值按照 `,` 分割后包含某值
- `[attribute-=value]` 属性以某值标记的开头（value 后面必须有内容且不能紧跟字母和数字，eg. `btn-user`、`btn-*`、`btn-`、`btn.user`）。
- `[attribute^=value]` 属性以某值开头
- `[attribute$=value]` 属性以某值结尾
- `[attribute!=value]` 属性不等于某值


### 特殊符号
- 特殊符号（组1）：`[`,`]`,`=`,`*`,`,`,`|`,`^`,`$`,`!`,`,`
- 特殊符号（组2）：`'`,`"`
- 特殊符号（组3）：`/`
- 特殊符号（组4）：`undefined`

> 特殊符号使用注意
- 默认属性和值中间不能包含特殊符号（组1）。
- 如果属性和值中确实需要使用特殊符号（组1），那么需要将属性或值用单引号或双引号包裹起来。此时可以使用特殊符号（组1）但是不能使用特殊符号（组2）
- 当操作符是 `=` 时, 属性或值如果以 `//` 包裹起来，则以正则规则处理。
- `undefined` 表示不存在， 字符串 `undefined` 也等于不存在。
- 空格（其他空白字符）不是特殊符号，按照其原本的样子匹配，属性和值都可以以空白开头和结尾，书写时请注意避免不必要的空白。


## 数值选择器
- `[attribute==number]` 属性等于某值
- `[attribute>number]` 属性大于某值
- `[attribute>=number]` 属性大于等于某值
- `[attribute<number]` 属性小于某值
- `[attribute<=number]` 属性小于等于某值


## 组合选择器
- 逻辑与 `[s1][s2]`
- 逻辑或 `[s1],[s2]`
- 组合逻辑 `[s1],[s2][s3],[s4]` 逻辑与总是优先于逻辑或执行。


## 联系
postmaster(a)fullstack.club
