const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const prodConfig = {
  mode: 'production',
  entry: {
    index: './index.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false, // Stops renaming variables and params during minification process.
        },
      }),
    ],
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
};

module.exports = merge(commonConfig, prodConfig);
