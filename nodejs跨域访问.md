当使用express开发一些接口的时候，会遇到跨域的问题。处理此问题依然采用最简单暴力的方法

```javascript
router.get("/getList", function (req, res, next) {
    var arrQuestions = getQuestionsData();
    //////加上此段代码 解决js跨域请求问题
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ status: "y", msg: "获取数据成功", data: arrQuestions });
})
```
