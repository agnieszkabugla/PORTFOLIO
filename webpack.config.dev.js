import webpack from 'webpack';
import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';

const config = {
  mode: 'development',
  context: path.resolve(__dirname, './source/'),
  entry: {
    app: './index.js'
  },
  devtool: 'inline-source-map',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './public/src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, './source/'),
        exclude: path.join(__dirname, './node_modules/'),
        use: {loader: 'babel-loader'}
      }
    ]
  }

};

module.exports = config;
