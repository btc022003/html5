# 通过md5对数据进行加密处理

```js
const crypto = require('crypto')

function md5(str){
    const md5 = crypto.createHash('md5')
    return md5.update(str).digest('hex').toString()
}

console.log(md5('xiaoming'))
```