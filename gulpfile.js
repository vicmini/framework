const gulp = require('gulp'),
  babel = require('gulp-babel'),
  // const watch = require('gulp-watch');
  plumber = require('gulp-plumber'),
  nodemon = require('gulp-nodemon'),
  rollup = require('gulp-rollup'),
  replace = require('rollup-plugin-replace'),
  glob = require('glob'),
  gulpSequence = require('gulp-sequence'),
  //buffer = require('vinyl-buffer'),
  eslint = require('gulp-eslint');
// shell = require('gulp-shell');

// 开发环境build服务端的脚本
gulp.task('build:dev', () => {
  gulp.src('./src/serve/**/*.js')
    .pipe(plumber())
    // .pipe(shell('npm run lint:fix'))
    .pipe(eslint())
    .pipe(eslint.format('codeframe'))
    .pipe(eslint.failAfterError())
    .pipe(babel({
      'babelrc': false, // 不采用.babelrc的配置
      'plugins': ['transform-es2015-modules-commonjs',
        ['@babel/plugin-proposal-decorators', {
          'legacy': true
        }]
      ]
    }))
    .pipe(gulp.dest('dist'));
});

// 生产环境build服务端的脚本
gulp.task('build:prod', () => {
  gulp.src('./src/serve/**/*.js')
    .pipe(babel({
      'babelrc': false,
      'ignore': ['./src/serve/config/*.js'], // 配置文件使用流清洗
      'plugins': [
        'transform-es2015-modules-commonjs',
        ['@babel/plugin-proposal-decorators', {
          'legacy': true
          //'decoratorsBeforeExport':true
        }]
      ]
    }))
    .pipe(gulp.dest('./dist'));
});

// 使用nodemon监控文件变化并重启服务
gulp.task('start:dev', function () {
  nodemon({
    'script': './dist/app.js',
    'ext': 'js html css',
    'env': {
      'NODE_ENV': 'development'
    },
    'watch': ['./src/serve'],
    'tasks': ['build:dev']
  });
});

// config配置文件流清洗
gulp.task('clean:config', () => {
  //glob.sync(pattern, [options])
  gulp.src('./src/serve/**/*.js')
    .pipe(rollup({
      'output': {
        'format': 'cjs'
      },
      'input': glob.sync('./src/serve/config/*.js'),
      'plugins': [
        replace({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      ]
    }))
    // .pipe(buffer())
    .pipe(gulp.dest('./dist'));

});
let _task = [];
if (process.env.NODE_ENV === 'production') {
  _task = gulpSequence('build:prod', 'clean:config');
} else {
  _task = gulpSequence('build:dev', 'start:dev');
}
console.log(_task);
gulp.task('default', _task);
