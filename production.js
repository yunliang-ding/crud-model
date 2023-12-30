const Application = require('thinkjs');

new Application({
  ROOT_PATH: __dirname,
  APP_PATH: `${__dirname}/src/apis`,
  proxy: true, // use proxy
  env: 'production'
}).run();
