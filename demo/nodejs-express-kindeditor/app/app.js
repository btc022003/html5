/**
 * Created by yuluo on 16/7/2.
 */
var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//配置全局kindeditor上传目录
global.uploadDir = __dirname+'/public/upload'

///引入art-template模板引擎
var template = require('art-template');
/////art-template配置 标准格式 照抄即可
app.set('views', './views');//放模板文件的目录 此处是模板文件的存放位置
template.config('base', ''); ////指定模板目录
template.config('extname', '.html'); ////模板的后缀名
app.engine('.html', template.__express); ////express的html模板引擎使用art-template
app.set('view engine', 'html'); ////设置express模板引擎


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static('./public'));

//////kindeditor测试部分内容
app.use('/',require('./routes/common/kindeditor/demo'));
/////kindeditor文件上传部分代码
app.use('/common/kindeditor', require('./routes/common/kindeditor/index'));


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('server is running on ' + host + ':' + port);
});