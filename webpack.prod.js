const { merge } = require('webpack-merge');
// const commonConfig = require('./webpack.common');
const devConfig = require('./webpack.dev');
const path = require('path');

const prodConfig = {
  // mode: 'production',
  entry: {
    index: './index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};

module.exports = merge(devConfig, prodConfig);
