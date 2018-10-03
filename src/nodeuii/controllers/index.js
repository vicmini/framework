import {
  IndexController
} from './IndexController';
const indexController = new IndexController();

export default function (app, router) {
  router.get('/', indexController.homepageAction())
  router.get('/test',indexController.indexAction());
  app.use(router.routes());
  app.use(router.allowedMethods());
}
