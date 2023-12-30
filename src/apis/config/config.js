// default config
const isDev = think.env === 'development';

module.exports = {
  workers: 1,
  env: think.env,
  port: isDev ? 7501 : 7500,
  stickyCluster: true,
};
