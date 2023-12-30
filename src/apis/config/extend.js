const model = require('think-model');
const cache = require('think-cache');
const websocket = require('think-websocket');

module.exports = [
  model(think.app),
  websocket(think.app),
  cache,
];
