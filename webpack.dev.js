const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: './index.js',
  },
  devServer: {
    static: './dist',
    hot: true,
    historyApiFallback: true,
  },
};

module.exports = merge(commonConfig, devConfig);
