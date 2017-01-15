
var path = require('path');
// var webpack = require('webpack');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.min.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.min.js')
var p2 = path.join(phaserModule, 'build/custom/p2.min.js')


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
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      Phaser: phaser,
      PIXI: pixi,
      p2: p2,
      
      // SafeSpot: components+'SafeSpot.js',
    }
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: pixi, loader: 'expose-loader?PIXI' },
      { test: phaser, loader: 'expose-loader?Phaser' },
      { test: p2, loader: 'expose-loader?p2' },
    ]
  },
};
