js中获取当前时间的方法是
```javascript
// 获取当前时间
var now = new Date();
console.log(now.getFullYear()); ////获取当前的年数据
console.log(now.getMonth()); ////获取当前的月 从0开始 0表示一月
console.log(now.getDate());/////获取日

/****
* /////以下语句都是单独运行的 每次之前都要重新设置一次now的时间才有效果
*now.setMonth(0); ///当前年的一月
*now.setMonth(1); ////当前年的二月
*now.setMonth(11); ////当前年的十二月
*now.setMonth(12); ////下一前年的一月
********/
//now.setMonth(0);//修改月份相关 基于当前年为基础
//now.setDate(1); ////修改日期 基于当年月份

```

通过js在页面上实现一个简单的时间走动效果
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Date</title>  
</head>
<body>    
    <script>
    //// 执行requestAnimationFrame动画帧函数
    /// 每秒钟执行60次
    requestAnimationFrame(getStrTime);

    /****
     * 把js获取的日期中的 getDay()数据转换位中文的星期几文字
     */
    var jsDayToDay = ['日','一','二','三','四','五','六'];

    /****  
     * 设置页面中显示的时间字符串文字
     */
    function getStrTime(){
        /****
         * 获取当前时间
         */
        var now = new Date(); ////每一次通过动画效果刷新页面后获取当前时间
        var strHtml = now.getFullYear()+'年' /////获取年
                  +(now.getMonth()*1+1)+'月' /////获取月
                  +now.getDate()+'日' //////获取日
                  +'星期'+jsDayToDay[now.getDay()] /////获取周几
                  +' '+now.getHours()+':' /////获取当前小时
                  +now.getMinutes()+':' /////获取当前分钟
                  +now.getSeconds(); /////获取当前秒
         document.body.innerHTML = strHtml;
         requestAnimationFrame(getStrTime);
    }
    </script>    
</body>
</html>
```
