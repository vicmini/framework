 const utils = require('./utils')
 const pluginName = 'htmlAfterWebpackPlugin';
 class HtmlAfterWebpackPlugin {
   apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
       compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData => {
         let _html = htmlPluginData.html;
         const _result = utils.assetsHandle(htmlPluginData.assets);
         _html = _html.replace('<!--injectcss-->', _result.css.join(''));
         _html = _html.replace('<!--injectjs-->', _result.js.join(''));
         htmlPluginData.html = _html;
       })
     });
   }
 }
 module.exports = HtmlAfterWebpackPlugin;
