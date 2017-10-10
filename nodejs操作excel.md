#### nodejs操作excel例子

> 在实际开发中往往会需要用到操作excel文件的例子

```js
// 需要安装模块xlsx
const XLSX = require('xlsx');
var workbook = XLSX.readFile('2017-10-09.xlsx'); // 读取指定的文件
// console.log('打开文件');
/* DO SOMETHING WITH workbook HERE */
var first_sheet_name = workbook.SheetNames[0];
// console.log(first_sheet_name);
/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];

const headers = {};
var data = [];
const keys = Object.keys(worksheet);
keys
    // 过滤以 ! 开头的 key
    .filter(k => k[0] !== '!')
    // 遍历所有单元格
    .forEach(k => {
        // 如 A11 中的 A
        let col = k.substring(0, 1);
        // 如 A11 中的 11
        let row = parseInt(k.substring(1));
        // 当前单元格的值
        let value = worksheet[k].v;
        // 保存字段名
        if (row === 1) {
            headers[col] = value;
            return;
        }
        // 解析成 JSON
        if (!data[row]) {
            data[row] = {};
        }
        data[row][headers[col]] = value;
    });
// var edata = Array.prototype.slice.call(data,0);
// console.log(edata[0]);

// console.log(typeof(edata));
data.forEach(i=>{
    console.log(i);
})
```