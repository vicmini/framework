import {
  route,
  GET
  // POST,
  // before
} from 'awilix-koa';

class IndexController {
  constructor({
    indexModel
  }) {
    this.indexModel = indexModel;
  }
  @route('/test')
  @GET()
  async indexAction(ctx) {
    ctx.body = 'Hello World!';
  }
  @route('/index')
  @GET()
  async homepageAction(ctx) {
    const data = await this.indexModel.getData();
    ctx.body = await ctx.render('home/home', {
      data
    });
  }
}
export default IndexController;
