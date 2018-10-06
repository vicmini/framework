const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const path = require('path');
module.exports = {
  plugins: [
    // 处理views中的模板
    new CopyWebpackPlugin([{
      from: `${path.join(__dirname,'../src/webapp/views/common/')}`,
      to: `../views/common/`
    }]),
    // 处理components中的模板
    new CopyWebpackPlugin([{
      from: `${path.join(__dirname,'../src/webapp/components/')}`,
      to: `../components`
    }], {
      copyUnmodified: true,
      ignore:['*.js','*.ts','*.css','*.less','*.scss','.DS_Store']
    }),
    new LiveReloadPlugin(),
    new ExtractTextPlugin({
      filename:(getPath)=>{
        return getPath('styles/[name].css')
      },
      allChunks:true,
    }),
  ]
}
