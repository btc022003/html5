gulp安装使用nodejs进行安装,安装为全局变量  

```bash
npm install gulp -g  
```

常用的gulp插件  
```
gulp-imagemin //压缩图片
gulp-file-include //实现客户端html代码的局部独立化
gulp-nodemon //监控nodejs项目代码的改动 重启程序
```

gulp使用的配置文件为 gulpfile.js,配置文件的写法非常看起来很容易理解,符合程序代码的写法,😒比grunt 让人很是不爽的配置文件强多了

```javascript
/**
 * gulp 简单使用demo
 * 通过npm直接安装相关的插件即可
 */
var gulp = require('gulp'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

/////创建一个编译压缩less的命令
gulp.task('firsttask',function(){
  gulp.src('./src/less/index.less')
      .pipe(less())
      .pipe(minifycss())
      .pipe(gulp.dest('./dist/css'));
});

/////创建一个压缩js文件的任务
gulp.task('jsmin',function(){
  gulp.src('./src/**/*.js')
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'))
})

/////创建一个watchless任务 可以监视文件的改变 当文件改变的时候直接执行firsttask任务
gulp.task('watchless',function(){
  gulp.watch('./src/less/*.less',['firsttask'])
})

/////创建一个默认任务集合
gulp.task('default',['firsttask','elseTask']);

```

demo在demo目录中的grunt-demo中

```
运行方式
gulp firsttask ////运行
gulp jsmin     /////
gulp watchless  ////
```

> 用多了之后发现平时离不开这个了...
