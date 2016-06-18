下面这段代码，看着心累啊......,能不这么多套路吗

 > 假如你想帮他尽快找个活儿， 赚到钱， 推荐PHP。  
假如你想让他成为一个高效工程师， 推荐 Python。   
假如你想让他爱上他的工作， 推荐 Ruby。

```javascript
var fs = require("fs");
var buf = new Buffer(1024);

console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("准备读取文件！");
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }

      // 仅输出读取的字节
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }

      // 关闭文件
      fs.close(fd, function(err){
         if (err){
            console.log(err);
         }
         console.log("文件关闭成功");
      });
   });
});
```
