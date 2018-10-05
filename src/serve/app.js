import Koa from 'koa';
// import Router from 'koa-router';
import render from 'koa-swig';
import serve from 'koa-static';
import log4js from 'log4js';
import co from 'co';
import path from 'path';
import {
  createContainer,
  Lifetime
} from 'awilix';
import {
  scopePerRequest,
  loadControllers
} from 'awilix-koa';

import {
  ErrorHandle
} from './middlewares/ErrorHandle';
// import initController from './controllers';
import config from './config';

const app = new Koa();
// const router = new Router();
// 错误处理 log4js日志
log4js.configure({
  'appenders': {
    'serve': {
      'type': 'file',
      'filename': path.join(__dirname, 'logs/node-app.log')
    }
  },
  'categories': {
    'default': {
      'appenders': ['serve'],
      'level': 'error'
    }
  }
});
ErrorHandle.error(app, log4js.getLogger('serve'));

// 静态资源
app.use(serve(
  config.assetsDir, {
    'maxage': 0, // Browser cache max-age in milliseconds. defaults to 0
    'hidden': false, // Allow transfer of hidden files. defaults to false
    'index': 'index.html', // Default file name, defaults to 'index.html'
    'defer': false, // If true, serves after return next(), allowing any downstream middleware to respond first.
    'gzip': true, //  Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.
    'br': true, //  Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br
    setHeaders(res) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }, // extension exists (note, that brotli is only accepted over https). defaults to true.
    'extensions': ['.html', '.jpeg'] // Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to false)
  }));

// 模板引擎
app.context.render = co.wrap(render({
  'root': config.viewDir,
  'autoescape': true,
  'cache': 'memory', // disable, set to false
  'ext': 'html',
  'writeBody': false
}));

// 初始化路由
const container = createContainer();
app.use(scopePerRequest(container));
container.loadModules([__dirname+'/models/*.js'], {
  'formatName': 'camelCase',
  'resolverOptions': {
    'lifetime': Lifetime.SCOPED
  }
});
app.use(loadControllers('controllers/*.js', {
  'cwd': __dirname
}));
// initController(app, router);

app.listen(config.port, () => {
  console.log(`server is on ${config.port}`);
});
