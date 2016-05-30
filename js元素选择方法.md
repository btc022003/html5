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
