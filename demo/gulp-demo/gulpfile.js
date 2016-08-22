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
