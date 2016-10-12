var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, path.join("src", "client", "public"));
var APP_DIR = path.resolve(__dirname, path.join("src", "client", "app"));

var config = {
  entry: APP_DIR + '\\index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel',
      }
    ]
  },
  target: 'electron-renderer',
  devtool: 'source-map',
};

module.exports = config;
