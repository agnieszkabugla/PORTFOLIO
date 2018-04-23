import webpack from 'webpack';
import path from 'path';
//import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';  

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
}; 

const config = {
  context: path.resolve(__dirname, './source'),
  entry: {
    // removing 'public/src' directory from entry point, since 'context' is taking care of that
    app: './index.js'
  },  
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),  //note: physical files are only output by the production build task 'npm run build'
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist')
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    //new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname, 'source/style/css'), to:'style/css'},
      {from: path.resolve(__dirname, 'source/style/photos'), to:'style/photos'}
    ]),
    //minify JS
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false,
      }
    }),
    // create HTML file that includes reference to bundled js
    new HTMLWebpackPlugin({
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
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