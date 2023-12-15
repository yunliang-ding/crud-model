const Base = require("./base.js");

module.exports = class extends Base {
  async infoAction() {
    try {
      const { data } = await this.CenterServices({
        method: "post",
        url: "/user/userinfo",
      });
      this.json(data);
    } catch (error) {
      console.log(error)
    }
  }
  async logoutAction() {
    const { appid } = this.ctx.request.header;
    // 注销客户端cookie
    this.cookie(`app_auth_${appid}`, null, {
      domain: ".yunliang.cloud",
    });
    this.json({
      code: 200
    });
  }
};
