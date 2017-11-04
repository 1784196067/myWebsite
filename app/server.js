var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

config.entry.app.unshift("webpack-dev-server/client?http://localhost:8000/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase:'http://localhost:8080/',
    publicPath: "/views/"
});
server.listen(8000);
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/blog');
require('./model/blog_model.js');
require('./model/artical_model.js');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());
require('./ui_routes')(app);
app.listen(8080);
