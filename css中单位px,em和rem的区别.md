>px像素（Pixel）。相对长度单位。像素px是相对于显示器屏幕分辨率而言的。(引自CSS2.0手册)  
em是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。(引自CSS2.0手册)


任意浏览器的默认字体高都是16px。所有未经调整的浏览器都符合:1em=16px。那么12px=0.75em,10px=0.625em。为了简化font-size的换算,需要在css中的body选择器中声明Font-size=62.5%，这就使em值变为 16px*62.5%=10px, 这样12px=1.2em, 10px=1em,也就是说只需要将你的原来的px数值除以10，然后换上em作为单位就行了。


> rem是CSS3新增的一个相对单位（root em，根em）

rem是CSS3新增的一个相对单位（root em，根em），这个单位引起了广泛关注。这个单位与em有什么区别呢？区别在于使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。目前，除了IE8及更早版本外，所有浏览器均已支持rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。这些浏览器会忽略用rem设定的字体大小。


> vh、vw：相对于视口的高度和宽度，而不是父元素的(CSS百分比是相对于包含它的最近的父元素的高度和宽度)。

1vh 等于1/100的视口高度，1vw 等于1/100的视口宽度。

> vmin、vmax：关于视口高度和宽度两者的最小值或者最大值。

比如，浏览器的宽度设置为1200px，高度设置为800px， 1vmax = 1200/100px = 12px， 1vmin = 800/100px = 8px。如果宽度设置为600px,高度设置为1080px, 1vmin就等于6px, 1vmax则未10.8px。

