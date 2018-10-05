export const ErrorHandle = {
  error(app, logger) {
    // 处理服务器异常
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        logger.error(e);
        ctx.status = 200; // 不给500,可以防止百度搜索引擎降权
        ctx.body = '出错了(ｷ｀ﾟДﾟ´)!!';
      }
    });
    // 处理404错误
    app.use(async (ctx, next) => {
      await next();
      if (ctx.status === 404) {
        ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="回到我的主页"></script>';
      }
      return;
    });
  }
};
