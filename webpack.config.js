'use strict'

const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const env = process.env.NODE_ENV || 'production'

let config = {

  entry: {
    'formr': './index.js'
  },

  watch: Boolean(env == 'development'),

  output: {
    path: path.resolve('./dist'),
    filename: `[name]${env === 'production' ? '.min' : ''}.js`
  },

  devtool: false,

  resolve: {
    modules: [
      path.resolve(__dirname),
      path.resolve('./node_modules')
    ]
  },

  module: {
    rules: [
      /*{
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },*/
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('./src'),
      verbose: true,
      dry: false
    })
  ]

}

if (env === 'production') {

  config.plugins.unshift(
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: false,
      ecma: 5
    })
  )

}

module.exports = config
