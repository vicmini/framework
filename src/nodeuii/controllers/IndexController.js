import {
  IndexModel
} from '../models/IndexModel';

export class IndexController {
  constructor() {}
  indexAction() {
    return async (ctx, next) => {
      ctx.body = "Hello World!"
    }
  }
  homepageAction() {
    return async (ctx, next) => {
      const indexModelIns = new IndexModel();
      const data = await indexModelIns.getData();
      ctx.body = await ctx.render('index', {
        data
      });
    }
  }
}
