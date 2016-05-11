> 动画

```
animation-name	规定需要绑定到选择器的 keyframe 名称。。
animation-duration	规定完成动画所花费的时间，以秒或毫秒计。
animation-timing-function	规定动画的速度曲线。
animation-delay	规定在动画开始之前的延迟。
animation-iteration-count	规定动画应该播放的次数。
animation-direction	规定是否应该轮流反向播放动画。
```

1. animation-timing-function
```
linear	动画从头到尾的速度是相同的
ease	默认。动画以低速开始，然后加快，在结束前变慢
ease-in	动画以低速开始
ease-out	动画以低速结束
ease-in-out	动画以低速开始和结束
cubic-bezier(n,n,n,n)	在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值		
```

2. animation-iteration-count
```
n	定义动画播放次数的数值。
infinite	规定动画应该无限次播放。
```
3. animation-direction
```
animation-direction 属性定义是否应该轮流反向播放动画。
如果 animation-direction 值是"alternate"，则动画会在奇数次数（1、3、5等等）正常播放，而在偶次数（2、4、6 等等）向后播放。
animation-direction: normal|alternate;
```
4. animation-delay  
```
animation-delay 值以秒或毫秒计。
允许负值，-2s 使动画马上开始，但跳过 2 秒进入动画。
```
[效果](https://jsfiddle.net/nywx8mpg/)
```html
<html>
    <head>
        <title>旋转</title>
        <meta charset="utf-8">
        <style>            
            div{
                width: 200px;
                height: 20px;
                margin: 100px auto;
                background-color: #ffee33;              
                animation-name:rotate;
                animation-duration:3.0s;
                animation-timing-function:linear;
                animation-iteration-count:infinite;
            }

            @keyframes rotate {
                0%{
                    transform:rotate(0);
                }
                100%{
                    transform:rotate(360deg);
                }
            }
        </style>
    </head>
    <body>        
      <div></div>                    
    </body>
</html>
```
