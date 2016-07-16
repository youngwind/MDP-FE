"use strict";

// 引用
var gulp = require("gulp");
var del = require("del");
var changed = require("gulp-changed");
var merge = require('merge-stream');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');

var config = require('./src/config.js');

// 错误监听
var errorHandler = function (err) {
    console.error(err);
};

// 复制文件
gulp.task('copy', function () {
    return merge(
        gulp.src([
            'node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf',
            'node_modules/material-design-icons/iconfont/MaterialIcons-Regular.eot',
            'node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff',
            'node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2',
        ]).pipe(gulp.dest('public/font'))
    );

});

// js编译压缩
gulp.task("js", function () {
    gulp.src("src/javascript/**/*.js")
        .pipe(browserify({}))
        .pipe(gulp.dest("public/js"));
});

// scss编译压缩
gulp.task("css", function () {
    return gulp.src("src/style/**/*.scss")
        .pipe(changed("public/css"))
        .pipe(sass().on("error", errorHandler))
        .pipe(gulp.dest("public/css"));
});


// 清理文件
gulp.task("clean", function () {
    return del([
        'public'
    ]);
});

// 监听变动
gulp.task("watch", function () {
    gulp.watch(["src/javascript/**/*.js"], ["js"]);
});

// 默认任务
gulp.task("default", ["copy", "js", "css"]);