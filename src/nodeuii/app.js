import Koa from 'koa';
import Router from 'koa-router';
import render from 'koa-swig';
import co from 'co';
import path from 'path';

import initController from './controllers';
import config from './config';

const app = new Koa();
const router = new Router();
// 模板引擎
app.context.render = co.wrap(render({
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  writeBody: false
}));
// 初始化路由
initController(app, router);

app.listen(config.port, () => {
  console.log(`server is on ${config.port}`);
})
