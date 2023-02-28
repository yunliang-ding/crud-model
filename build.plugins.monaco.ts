const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages: ['javascript', 'typescript', 'html', 'json'],
      },
    ]);
  });
};