关于在div等容器中出现横向滚动条的效果，最近又一次遇到了。现在把代码总结一下

```html
<!-- 通过使用white-space样式进行设置,参考链接http://www.w3school.com.cn/jsref/prop_style_whitespace.asp -->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>横向滚动条</title>
    <style>
        html,body{
            height: 100%;
            margin: 0 0;
            padding: 0 0;
        }
        .container{
            width:100%;
            overflow-x: scroll;
            overflow-y: hidden;
            white-space:nowrap;
        }
        .container img{
            width: 300px;
            margin: 10px 10px;
        }
    </style>
</head>
<body>
<div class="container">
    <img src="http://lixuanqi.com/public/meizi/9d52c073gw1ea5gzohndtj20g40ndaf4.jpg" alt="">
    <img src="http://lixuanqi.com/public/meizi/9d52c073gw1ea5gzohndtj20g40ndaf4.jpg" alt="">
    <img src="http://lixuanqi.com/public/meizi/9d52c073gw1ea5gzohndtj20g40ndaf4.jpg" alt="">
    <img src="http://lixuanqi.com/public/meizi/9d52c073gw1ea5gzohndtj20g40ndaf4.jpg" alt="">
    <img src="http://lixuanqi.com/public/meizi/9d52c073gw1ea5gzohndtj20g40ndaf4.jpg" alt="">
    <img src="http://lixuanqi.com/public/meizi/9d52c073gw1ea5gzohndtj20g40ndaf4.jpg" alt="">
    <img src="http://lixuanqi.com/public/meizi/9d52c073gw1ea5gzohndtj20g40ndaf4.jpg" alt="">
    <img src="http://lixuanqi.com/public/meizi/9d52c073gw1ea5gzohndtj20g40ndaf4.jpg" alt="">
    <img src="http://lixuanqi.com/public/meizi/9d52c073gw1ea5gzohndtj20g40ndaf4.jpg" alt="">
    <img src="http://lixuanqi.com/public/meizi/9d52c073gw1ea5gzohndtj20g40ndaf4.jpg" alt="">
</div>
</body>
</html>
```
