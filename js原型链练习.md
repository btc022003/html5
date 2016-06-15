```javascript
///定义一个DateFun的对象类型用来处理事件类型数据
/**
 * [定义一个DateFun的对象类型用来处理事件类型数据]
 * @param {[Date]} dateVal [日期参数，如果为空则取当前日期]
 */
function DateFun(dateVal) {
	this.date = dateVal || new Date();
}
DateFun.prototype = {
    ////格式化日期
	formatDate: function() {
		return this.date.getFullYear() + '-' + this.date.getMonth() + 1 + '-' + this.date.getDay();
	},
    ////格式化时间
	formatTime: function() {
		return this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
	},
    ////格式化日期时间
	formatDateTime: function() {
		return this.formatDate() + ' ' + this.formatTime()
	}
}

//////调用的demo
var d = new DateFun();
console.log(d.formatDate())
console.log(d.formatTime())
console.log(d.formatDateTime())
```
