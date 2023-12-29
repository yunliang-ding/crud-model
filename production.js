const Application = require('thinkjs');

new Application({
  ROOT_PATH: __dirname,
  APP_PATH: `${__dirname}/src`,
  proxy: true, // use proxy
  env: 'production'
}).run();
