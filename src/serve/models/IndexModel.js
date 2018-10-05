/**
 *
 *
 * @classdesc 生成一段异步数据
 * @class IndexModel
 */
export default class IndexModel {
  /**
   * @classdesc Creates an instance of IndexModel.
   * @param {*}
   * @memberof IndexModel
   */
  constructor() {

  }
  /**
   *
   *
   * @returns {Promise} 返回的异步数据
   * @example return new Promise
   * @memberof IndexModel
   */
  getData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('来了一段异步的数据');
      }, 1000);
    });
  }

}
