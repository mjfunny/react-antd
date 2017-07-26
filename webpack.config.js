const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 单独打包css
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html

const DEV = process.env.NODE_ENV === 'development'; // 开发环境
const PROD = process.env.NODE_ENV === 'PROD'; // 生产环境
console.log('环境', process.env.NODE_ENV, DEV, PROD);

let entry = [
  './src/index.js',
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
];

module.exports = {
  entry,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
  },
};
