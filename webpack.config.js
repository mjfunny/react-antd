const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 单独打包css
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html

// 入口路径
const INDEX_PATH = path.join(__dirname, 'src/index.js');
// dist路径
const DIST_PATH = path.join(__dirname, 'dist');

// 分离不同的css 文件
const extractCSS = new ExtractTextPlugin('css/[name]-[contenthash:6].css');
const extractLESS = new ExtractTextPlugin('css/[name]-[contenthash:6].css');

// 第三方库
const vendor = ['react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux',
  'redux-saga',
  'antd',
];

// 判断生产环境
const isProd = process.env.NODE_ENV === 'production';
console.log('环境', process.env.NODE_ENV, isProd);

const entry = isProd ? {
  app: INDEX_PATH,
  vendor,
} : {
  app: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    INDEX_PATH,
  ],
  vendor,
};
const output = isProd ? {
  path: DIST_PATH,
  filename: 'js/[name].[chunkhash:6].min.js',
  publicPath: '/dist/',
} : {
  path: DIST_PATH,
  filename: '[name].[hash:6].js',
  publicPath: '/',
};

module.exports = {
  entry,
  output,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { // 启用css-modules 模式， 默认false
              importLoaders: 1, // 在css-loader前应用的 loader数，默认0
            },
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
            },
          }],
        }),
      },
      {
        test: /\.less$/,
        use: extractLESS.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { // 启用css-modules 模式， 默认false
              importLoaders: 2, // 在css-loader前应用的 loader数，默认0
            },
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
            },
          }, 'less-loader'],
        }),
        // use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
        exclude: /node_modules/,
        // loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/[hash:6].[name].[ext]',
          },
        },
        // loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
        // 注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React App',
      inject: 'body',
      filename: 'index.html',
      template: './src/index.html',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common', 'vendor', 'manifest'],
      minChunks: Infinity,
    }),
    extractCSS,
    extractLESS,
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less'],
  },
  devtool: 'inline-eval-source-map',
};

// 生产环境配置
if (isProd) {
  //module.exports.devtool = 'source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),

  ]);
} else {
  // 开发环境配置
  module.exports.devServer = {
    publicPath: '/',
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
  };

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
  ]);
}
