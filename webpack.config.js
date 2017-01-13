
var path = require('path');
var webpack = require('webpack');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')


module.exports = {
  entry: './src/app.js',
  output: {
    pathinfo: true,
    path: './dist',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8088
  },
  devtool: 'cheap-source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
    ]
  },
};
