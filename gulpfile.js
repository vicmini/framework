 const gulp = require('gulp');
 const babel = require('gulp-babel');
 const watch = require('gulp-watch');
 const plumber = require('gulp-plumber');
 const nodemon = require('gulp-nodemon');

 // build服务端的脚本
 gulp.task('build:dev', () => {
   gulp.src('./src/nodeuii/**/*.js')
     .pipe(plumber())
     .pipe(babel({
       babelrc: false,
       plugins: ['transform-es2015-modules-commonjs']
     }))
     .pipe(gulp.dest('dist'));
 });

 // 使用nodemon监控文件变化并重启服务
 gulp.task('start:dev', function () {
   nodemon({
     script: './dist/app.js',
     ext: 'js html css',
     env: {
       'NODE_ENV': 'development'
     },
     watch: ['./src/nodeuii'],
     tasks: ['build:dev']
   })
 })

 let _task = ['start:dev'];
 if (process.env.NODE_ENV === 'production') {

 }
 gulp.task('default', _task);
