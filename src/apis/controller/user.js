const Base = require('./base.js');

module.exports = class extends Base {
  async infoAction() {
    try {
      const { data } = await this.CenterServices({
        method: 'post',
        url: '/user/userinfo',
      });
      this.json(data);
    } catch (error) {
      console.log(error);
    }
  }
};
