const axios = require('axios');

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://center.yunliang.cloud',
})

module.exports = class extends think.Controller {
  __before() {
    // 接口统一走中台的鉴权
  }
  CenterServices(config){
    return instance({
      ...config,
      headers: {
        ...config.headers,
        token: this.ctx.request.header.token,
      }
    })
  }
};
