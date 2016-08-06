1. jQuery的ajax请求
  ```javascript
  //在jQuery做ajax请求的时候,可以设置header中的参数
  //例子如下
  $.ajax({
          url: 'http://apis.baidu.com/showapi_open_bus/mobile/find?num=15000000000',
          headers: { apikey: 'apikey的值' }
        }).then(function (data, err) {
            console.log(data)
        })
  ```
