const merge = require('webpack-merge');
const glob = require('glob');
const path = require('path');
const argv = require('yargs-parser')(process.argv.slice(2));
const HappyWebpackPlugin = require('./config/happyWebpack');
const mode = argv.mode || 'development'; // 环境 production or development
const _modeFlag = (mode === 'production');
const _mergeConfig = require(`./config/webpack.${mode}.js`); // 加载配置文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlAfterWebpackPlugin = require('./config/htmlAfterWebpackPlugin');
// webpack 插件
let _plugins = [];
// 入口处理
let _entry = {};
const files = glob.sync(__dirname + '/src/webapp/views/**/*.entry.ts'); // 找到所有的入口文件
for (let file of files) {
  if (/^.+\/((\w+)-(\w+))\.entry\.ts$/g.test(file)) {
    const entryKey = RegExp.$1;
    const [dist, template] = [RegExp.$2, RegExp.$3];
    _entry[entryKey] = file;
    _plugins.push(new HtmlWebpackPlugin({
      filename: `../views/${dist}/${template}.html`,
      template: `src/webapp/views/${dist}/${template}.html`,
      inject: false,
      chunks: ['runtime',entryKey],
      minify: {
        collapseWhitespace: _modeFlag,
        removeAttributeQuotes: _modeFlag
      }
    }))
  }
}

//公共配置
let webpackConfig = {
  'entry': _entry,
  'output': {
    'path': path.join(__dirname, './dist/assets'),
    'publicPath': '/',
    'filename': 'scripts/[name].bundle.js'
  },
  'optimization':{
    /* 'splitChunks':{
      'chunks':'async',
      'minChunks':2
      'cacheGroups':{
        'commons':{
          'minChunks':2,
          'minSize':0,
          'name':'commons'
        }
      }
    }, */
    'runtimeChunk':{
      'name':'runtime'
    }
  },
  'module': {
    'rules': [{
      'test': /\.ts$/,
      'exclude': /node_modules/,
      'use': 'happypack/loader?id=happyTs'
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'happypack/loader?id=happyCSS'
      })

    }]
  },
  'plugins': [
    ..._plugins,
    ...HappyWebpackPlugin,
    new HtmlAfterWebpackPlugin(),
  ],
  'resolve': {
    'extensions': ['.ts', '.js'],
    'alias': {

    }
  }
};

module.exports = merge(webpackConfig, _mergeConfig);
