'use strict'
const webpack = require('webpack');
const path = require('path');
const os = require('os');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

// === 动态获取 host || 也可在package.json中配置 HOST （--host 0.0.0.0)
let HOSTS = [];
for (let key in os.networkInterfaces()) {
  os.networkInterfaces()[key].forEach(item => {
    if (item.family === 'IPv4' && item.address.indexOf('192.168.') !== -1) {
      HOSTS.push(item.address)
    }
  })
}

module.exports = {
  mode: 'production',

  entry: './src/main.js',
  
  output: {
    path: path.resolve('dist'),
    filename: `index.[hash:5].js`,
    publicPath: ''
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(png|svg|jpg|gif|eot|woff2?|ttf|TTF|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 5000, // 最大为b（字节）时，将使用base64编码
                name: '[name]-[hash:5].[ext]' // 打包后文件名
            }
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      }
    ]
  },

  devtool: process.env.NODE_ENV === 'production' ? '#nosources-source-map' : '#eval-source-map',

  devServer: {
    port: 2222,
    open: true,
    host: 'localhost',
    // host: HOSTS[0],
    // hot: true, // 此处需去掉，不然修改 less 不会生效
    proxy: {
      '/': {
          target: '',
          changeOrigin: true,
          logLevel: 'debug',
      }
    }
  },
  
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
    extensions: [".js", ".jsx", "less"]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.[hash:5].css"
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `./src/index.html`,
      inject: true,
      minify: {
        collapseWhitespace: true,
        minifyCSS: true
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: './static/manifest.json', to: './manifest.json' },
    ])
  ]
}
