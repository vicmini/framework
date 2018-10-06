const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const minify = require('html-minifier').minify;

const path = require('path');
module.exports = {
  output: {
    filename: 'scripts/[name].[hash:5].bundle.js'
  },
  plugins: [
    // 处理views中的模板
    new CopyWebpackPlugin([{
      from: `${path.join(__dirname,'../src/webapp/views/common/')}`,
      to: `../views/common/`,
      transform(content) {
        return minify(content.toString('utf-8'), {
          removeAttributeQuotes: true,
          collapseWhitespace:true
        });
      }
    }]),
    // 处理components中的模板
    new CopyWebpackPlugin([{
      from: `${path.join(__dirname,'../src/webapp/components/')}`,
      to: `../components`,
      transform(content) {
        return minify(content.toString('utf-8'), {
          removeAttributeQuotes: true,
          collapseWhitespace:true
        });
      }
    }], {
      //copyUnmodified: true,
      ignore: ['*.js', '*.ts', '*.css', '*.less', '*.scss', '.DS_Store']
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].[hash:5].css',
      allChunks: true,
    }),
  ]
}
