/**
 * Created by yuluo on 16/7/2.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var dateFormat = require('dateformat');


router.post('/uploadImg', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    //注意此处上传目录的路径
    form.uploadDir = global.uploadDir//__dirname+'/../../../public/upload';

    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }

        var image = files.imgFile;
        var path = image.path;
        path = path.replace(/\\/g, '/');
        var url = '/upload' + path.substr(path.lastIndexOf('/'), path.length);

        var info = {
            "error": 0,
            "url": url
        };
        res.send(info);
    });
});

/**
 * 判断就为图片
 * @param filetype 文件格式
 * @returns {boolean} 是否是图片
 */
function isPhoto(filetype) {
    const imgFileType = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imgFileType.indexOf(filetype) > -1;
}


router.get('/fileList',function(req,res){
    var uploadDir = global.uploadDir//path.join(__dirname, '/../public/uploads');
    fs.readdir(uploadDir, function (err, files) {
        if (err) {
            res.send('文件目录不存在！');
        } else {
            var fileArr = [];
            for (var i in files) {
                var filename = files[i];
                var filepath = uploadDir + '/' + filename;
                var stats = fs.statSync(filepath);
                var datetime = dateFormat(stats.birthtime, "yyyy-mm-dd hh:mm:ss");
                var filetype = filename.substring(filename.lastIndexOf('.', filename.length));
                var is_photo = isPhoto(filetype);
                var fileObj = {
                    is_dir: false,
                    has_file: false,
                    filesize: stats['size'],
                    is_photo: is_photo,
                    filetype: filetype,
                    filename: '/upload/' + filename,
                    datetime: datetime
                };
                fileArr[i] = fileObj;
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
            var result = {
                moveup_dir_path: '',
                current_dir_path: '',
                current_url: '',
                total_count: 5,
                file_list: fileArr
            };
            res.send(result);
        }
    });
})

module.exports = router;
