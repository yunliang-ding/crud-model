const Application = require('thinkjs');
const watcher = require('think-watcher');

new Application({
  ROOT_PATH: __dirname,
  APP_PATH: `${__dirname}/src`,
  watcher: watcher,
  env: 'development'
}).run();
