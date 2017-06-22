/**
 * @file Describe the file
 * author linhang(mail:colinued@163.com).
 */
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),            //图片压缩
    uglify = require('gulp-uglify'),                //JS压缩
    rename = require('gulp-rename'),                //改名
    watch = require('gulp-watch'),
    webserver = require('gulp-webserver'),
    minifycss = require('gulp-minify-css'),         //CSS压缩
    livereload = require('gulp-livereload'),        //自动化
    notify = require('gulp-notify'),
    replace = require('gulp-replace');


gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            directoryListing: {
                path: './',
                enable: true
            },
            port: 3636,
            open: true,
            livereload: true
        }));
    // connect.server({
    //     root: './',
    //     port: 3636,
    //     livereload: true
    // });
});

gulp.task('watch', function () {
    gulp.watch('./views/*.html', ['html']);
    gulp.watch('./public/css/*.css', ['css']);
    gulp.watch('./public/js/*.js', ['script']);
    // gulp.watch('./views/*.html', function (file) {
    //     console.log(file);
    //     console.log(livereload);
    //     livereload.changed(file.path);
    // });
});
// 图片压缩
gulp.task('img', function () {
    gulp.src('./public/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('./dist/img/'));
    console.log('IMG打包成功');
    // .pipe(notify({ message: '图片压缩完成' }));
    // .pipe(webserver.reload());
});


// JS压缩
gulp.task('script', function () {
    gulp.src('./public/js/*.js')
        .pipe(uglify({
            mangle: {except: ['require', 'exports', 'module', '$']}, //排除混淆关键字
            compress: true//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(gulp.dest('./dist/js/'));
    console.log('JS打包成功');
    // .pipe(notify({ message: 'JS压缩完成' }));
    // .pipe(webserver.reload());
});

// 样式压缩
gulp.task('css', function () {
    gulp.src('./public/css/*.css')
    //    .pipe(plumber())
    //    .pipe(sass({ style: 'expanded'}))
    //    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //    .pipe(gulp.dest('./dist/css/'));
    //    .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css/'));
    console.log('CSS打包成功');
    // .pipe(notify({ message: 'CSS压缩完成' }));
    // .pipe(webserver.reload());
});

gulp.task('html', function () {
    gulp.src('./views/*.html')
        .pipe(replace(/..\/public\//g, ''))
        .pipe(gulp.dest('./dist/'));
    console.log('HTML打包成功');
    // .pipe(notify({ message: '重启' }));
});
gulp.task('default', ['webserver', 'watch']);