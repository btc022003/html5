nodejs不借助第三方插件,实现http请求发送
```javascript
//// 使用url参数的方式格式化数据
const querystring = require('querystring')
// var postData =
var http = require('http')
function sendPost() {
    //////把json对象格式化为url传参的形势数据
    var postData = querystring.stringify({
      'msg' : 'Hello World!'
    });
    ////输出一下body中的参数
    console.log(postData)
    var options = {
        method: "get", ////请求方法
        hostname: "localhost", ////主机
        port: "3001", ///端口
        path: "/api/get_all_data/0", ///path 路径
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
    ////处处一下options内容
    console.log(options)
    var req = http.request(options, (res) => {
        /////成功后返回数据
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    })

    ////请求失败返回
    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

    // 写参数到body中
    req.write(postData);
    req.end()

}
sendPost()
```
