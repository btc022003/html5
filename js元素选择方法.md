js元素查找方法
> 在不使用jquery的情况下，通过原生js做元素查找也是一个不错的选择

```javascript

document.getElementById('id'); /////选择元素的id 获取单个元素

document.getElementByTagName('li'); //////根据标签名获取元素列表 返回数组

document.getElementsByClassName('list-item'); //////根据class的name获取元素列表 返回数组元素

document.getElementsByName('gender'); //////根据标签name属性获取元素列表 返回数组

document.querySelector('.container>div:nth-child(2)'); //////根据css选择器获取一个元素  返回单个元素

document.querySelectorAll('.container'); ///////返回一个元素列表 返回数组

```
关于元素选择的时候，选取已选择元素的子元素的问题。当有人问到这个问题的时候，我第一个想到的就是jquery，就说原生里面没有find方法。
可是我仔细思考后发现一个问题，就是我们通过元素的选择方法获取的是html标签，我们的document也是html标签。问什么不能在选择后的元素上再次使用选择标签呢？于是乎，经过测试发现在chrome下是可以的。代码如下
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>元素选择测试</title>
</head>
<body>
	<div id="main">
		<select name="sel" id="iSel">
			<option value="1">一</option>
			<option value="2">二</option>
			<option value="3">三</option>
		</select>
	</div>
	<script>
		var main = document.getElementById('main');

		console.log(document.getElementById('main').getElementsByTagName('select')[0]);
	</script>
</body>
</html>
```
