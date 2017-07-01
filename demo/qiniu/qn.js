var qiniu = require('qiniu')
var accessKey = '你的AK';
var secretKey = '你的SK';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
  scope: '你的存储空间的名字',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);
console.log(uploadToken)
