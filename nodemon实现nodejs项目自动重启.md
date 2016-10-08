现在我使用 nodemon 来代替 supervisor 来进行监控任务。  
相比 supervisor ，nodemon 的优点包括：更轻量级，内存占用更小。使用更加方便，更容易进行扩展等。  
npm install -g nodemon  
直接运行nodemon app.js即可，可以随时输入rs回车进行手动重启，非常方便。  
更多的使用方法可以在它的 github主页 找到。

Express 4.x 默认将启动模块分离到了./bin/www中，直接使用 supervisor 无法正常监控应用，使得开发过程中的调试非常不方便。  
直接在 app.js 添加 app 模块即可。  
```javascript
var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 3000); // 设定监听端口

// Environment sets...

// module.exports = app; 这是 4.x 默认的配置，分离了 app 模块,将它注释即可，上线时可以重新改回来

//启动监听
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
```

之后就可以正常的nodemon app.js进行调试了。
如果需要彻底改变启动方式，还需要修改packages.json

```javascript
"scripts": {
  "start": "node app.js" // 此处将原本的 'node ./bin/www' 改为 'node app.js'
}
```

之后运行npm start实际就是node app.js了。
