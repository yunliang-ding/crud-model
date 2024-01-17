const { default: axios } = require('axios');
const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    try {
      const url = this.ctx.originalUrl.replace(
        '/proxy',
        'https://dev-ops.yunliang.cloud:7200',
      );
      const option = {
        url,
        method: this.ctx.method,
        headers: this.ctx.header,
      };
      if (this.ctx.req.method === 'POST') {
        option.data = this.ctx.post();
      } else {
        option.params = this.ctx.param();
      }
      let { data } = await axios(option);
      this.json(data);
    } catch (error) {
      console.log(error);
      this.json({
        code: '30003',
        msg: '代理异常',
      });
    }
  }
};
