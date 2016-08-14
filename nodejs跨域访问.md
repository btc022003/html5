当使用express开发一些接口的时候，会遇到跨域的问题。处理此问题依然采用最简单暴力的方法

```javascript

////实际发布好只要在web服务器中设置即可
/////一次设置全部页面的跨域访问问题
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});

router.get("/getList", function (req, res, next) {
    var arrQuestions = getQuestionsData();
    //////加上此段代码 解决js跨域请求问题
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ status: "y", msg: "获取数据成功", data: arrQuestions });
})
```
