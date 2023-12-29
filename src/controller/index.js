const { readFileSync } = require('fs');
const path = require('path');

module.exports = class extends think.Controller {
  indexAction() {
    const content = readFileSync(
      path.resolve(
        __dirname,
        think.env === 'production' ? '../../www/build/index.html' : '../../www/dev/index.html',
      ),
    ).toString();
    this.ctx.res.end(content);
  }
};
