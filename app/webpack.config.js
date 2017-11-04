const webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  devtool: 'eval-source-map',
  context: __dirname,//上下文
  entry: {
   app:[
    //'webpack-hot-middleware/client?path=http://localhost:8000/__webpack_hmr',
    //'webpack-dev-server/client?http://localhost:8000/',//资源服务器地址
    'webpack/hot/only-dev-server',    
    './views/index.js'
    ]},
  output: {
    publicPath: "http://localhost:8080/views/",
    path: __dirname + '/views/',
    filename: './bundle.js'
  },
  devServer: {
    contentBase: "./views/",
    port: 8000,
    quiet:false,
    noInfo:true,
    hot:true,
    lazy:false,
    inline:true,
    publicPath: 'http://localhost:8080/',
    headers:{
        'Access-Control-Allow-Origin': '*'
    },
    stats:{
         colors:true
    }
  },  
  module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader", "style-loader")
            },
            {
                test: /\.scss$/,
                loader: 'sass-loader'
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("[name].css")
    ]
};