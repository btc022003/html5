通过nodejs实现爬虫功能

> 发现每种语言我都会倾向于这些爬虫类的实现

```javascript
// 安装模块 https://github.com/sylvinus/node-crawler
// npm install crawler

//主要代码如下
var Crawler = require("crawler");
var url = require('url');

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        $('.table a[target="_blank"]').each(function(index, a) {
            var toQueueUrl = $(a).attr('href');
            var txt = $(a).text();
            // c.queue(toQueueUrl);
            console.log(txt+"["+toQueueUrl+"]");
        });
    }
});

// Queue just one URL, with default callback
c.queue('http://kankindle.com/');

```

如果爬取的内容需要下载，就要调用下载模块

```javascript
// 安装模块 https://github.com/leeroybrun/node-mt-files-downloader
// npm install mt-files-downloader
var Downloader = require('mt-files-downloader');
var downloader = new Downloader();
////配置下载参数
/****
*FILE_URL 远程文件路径
*FILE_SAVE_PATH 文件保存的本地目录
****/
var dl = downloader.download('FILE_URL', 'FILE_SAVE_PATH');
dl.start();
```

使用此模块开发爬虫的时候遇到编码问题时的处理方式  
```javascript
// 通过设置forceUTF8和incomingEncoding处理中文编码页面的问题
var c = new Crawler({
    maxConnections: 10,
    forceUTF8: true,
    incomingEncoding: 'gb2312'
})
```
