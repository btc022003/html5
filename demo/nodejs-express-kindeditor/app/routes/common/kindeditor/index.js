/**
 * Created by yuluo on 16/7/2.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var dateFormat = require('dateformat');


router.post('/uploadImg', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;

    var dateDir = dateFormat(Date.now(), 'yyyymmdd') //为每一天上传的图片设置文件夹进行存储

    //注意此处上传目录的路径
    form.uploadDir = global.uploadDir + '/' + dateDir //__dirname+'/../../../public/upload';

    //判断文件夹是否存在,如果不存在就创建
    if (!fs.existsSync(form.uploadDir)) {
        fs.mkdirSync(form.uploadDir)
    }

    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }

        var image = files.imgFile;
        var path = image.path;
        path = path.replace(/\\/g, '/');
        var url = '/upload/' + dateDir + path.substr(path.lastIndexOf('/'), path.length); //返回路径的时候加上目录文件夹

        var info = {
            "error": 0,
            "url": url
        };
        res.send(info);
    });
});

/**
 * 判断是否为图片
 * @param filetype 文件格式
 * @returns {boolean} 是否是图片
 */
function isPhoto(filetype) {
    const imgFileType = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imgFileType.indexOf(filetype) > -1;
}

/**
 * 获取服务器端文件列表,需要继续完善
 */
router.get('/fileList', function (req, res) {
    // console.log(req.query)
    var temPath = '/' //文件管理时获取的目录路径
    if (req.query.path) {
        temPath = req.query.path
        var fi = temPath.split('/').findIndex(f=>{
            return f == 'upload'
        })
        // console.log(fi)
        if(fi>-1){
            temPath = temPath.split('/').slice(fi).join('/')
            // console.log('....')
            // console.log(temPath)
        }
        temPath = temPath.replace('upload', '')
    }
    if(!temPath.endsWith('/')){
        temPath += '/'
    }
    var uploadDir = global.uploadDir + temPath//path.join(__dirname, '/../public/uploads');

    fs.readdir(uploadDir, function (err, files) {
        if (err) {
            res.send('文件目录不存在！');
        } else {
            var fileArr = [];
            for (var i in files) {
                var filename = files[i];
                var filepath = uploadDir + '/' + filename;
                var stats = fs.statSync(filepath);
                var hasFile = false; //是否包含文件
                if (stats.isDirectory()) {
                    if (fs.readdirSync(filepath).length > 0) {
                        hasFile = true;
                    }
                }
                var datetime = dateFormat(stats.birthtime, "yyyy-mm-dd hh:mm:ss");
                var filetype = filename.substring(filename.lastIndexOf('.', filename.length));
                var is_photo = isPhoto(filetype);
                var fileObj = {
                    is_dir: stats.isDirectory(),
                    has_file: hasFile,
                    filesize: stats['size'],
                    is_photo: is_photo,
                    filetype: filetype,
                    filename: '/upload' + temPath + filename,
                    datetime: datetime
                };
                if (is_photo || stats.isDirectory()) {
                    fileArr[i] = fileObj;
                }
            }
            switch (req.query.order.toLowerCase()) {
                case 'type':
                    fileArr.sort(function (a, b) {
                        return a.filetype - b.filetype;
                    });
                    break;
                case 'size':
                    fileArr.sort(function (a, b) {
                        return a.filesize - b.filesize;
                    });
                    break;
                default:
                    fileArr.sort(function (a, b) {
                        return a.filename - b.filename;
                    });
                    break;
            }
            if (temPath.startsWith('/')) {
                temPath = temPath.substring(0, temPath.length - 1)
            }
            var result = {
                moveup_dir_path: temPath ? temPath.split('/').slice(0, -1).join('/') : '',
                current_dir_path: temPath,
                current_url: '',
                total_count: fileArr.length,
                file_list: fileArr
            };
            res.send(result);
        }
    });
})

module.exports = router;
