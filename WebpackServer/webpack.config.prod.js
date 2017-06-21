var path=require("path");
var webpack=require("webpack");
var HtmlWebpackPlugin=require("html-webpack-plugin");

module.exports={
  devtool:"source-map",
  entry:["./src/index"],
  output:{
    path:path.join(__dirname,"dist"),
    filename:"bundle.js"
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      compressor:{
        warnings:false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    // new webpack.DefinePlugins({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
}