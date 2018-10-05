import {
  route,
  GET
  // POST,
  // before
} from 'awilix-koa';

@route('/home')
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
    ctx.body = await ctx.render('index', {
      data
    });
  }
}
export default IndexController;
