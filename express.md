nodejs关于express相关的实现已经上传github了[express](https://github.com/btc022003/nodeapp)

nodejs上传图片带预览的效果也已经实现，把主要代码记录一下

html部分

```html
<!DOCTYPE html>
<html lang="en">
<head>
    {{include 'header'}}
    <title>文件上传</title>
</head>
<body>
    <div class="container">
        <form class="form-horizontal">
            <div class="form-group">
                <input type="hidden" name="ImgUrls" id="ImgUrls"/>
                <label class="col-sm-3 control-label no-padding-right">头像</label>

                <div class="col-sm-9">
                    <input id="single_image" style="width: 0px; height: 0px;" type="file" name="image">

                    <div class="ace-file-input col-xs-4 col-sm-2" id="yl_file_upload">
                        <label class="file-label selected" data-title="Change">
                            <!--<span class="file-name">-->
                                <!--<i class="icon-picture"></i>-->
                            <!--</span>-->
                            上传文件
                        </label>
                    </div>
                    <div class="thumbnail col-xs-6 col-sm-3">
                        <img id="m_imgCtrl" src="" style="height: 200px; display: block;"/>
                    </div>
                </div>
            </div>
        </form>
    </div>
    {{include 'footer'}}
    <script src="/static/assets/lib/jquery.html5uploader.min.js"></script>
    <script>
        ////////文件上传
        $("#single_image").html5Uploader({
            name:"Filedata",
            postUrl: "/common/uploadfile",
            onSuccess:function(msg){
                console.log(msg);
                try{
                    var url = JSON.parse(msg.currentTarget.response).url;
                    $("#m_imgCtrl").attr("src",url);
                    $("#ImgUrls").val(url);
                }
                catch(e){
                    console.log(e);
                }
            }
        });

        //////////文件上传点击
        $("#yl_file_upload").bind("click", function () {
            $("#single_image").click();
        });
    </script>
</body>
</html>
```

js部分

```javascript
////需要使用multer模块https://github.com/expressjs/multer
/**
 * Created by yuluo on 16/6/21.
 */
var express = require('express')

var fs = require('fs')

var router = express.Router()


/////文件上传
var multer = require('multer');
////设置图片上传后的保存路径 以及保存的文件名 使用了html图片上传插件
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        //console.log(Date.now()+file.originalname.slice('.').slice(-1))
        //cb(null, file.fieldname + '-' + Date.now())
        cb(null, Date.now()+'.'+file.originalname.split('.').slice(-1))
    }
})

var upload = multer({ storage: storage })

router.post('/uploadfile',upload.single('Filedata'),function(req,res){
    // console.log(req)
    //console.log(req.file)
    ////返回 路径+文件名
    res.json({url:'/uploads/'+req.file.filename});
})

module.exports = router
```
