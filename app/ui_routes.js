var express = require('express');
module.exports = function(app){
	var article = require('./controllers/comment_controller.js');
	app.use('/static', express.static('./static'))
	.use('/views', express.static('./views'))
	.use('/images', express.static('./images'));
	app.get('/', function(req, res){
		res.render('index');
	});
	app.get('/comment', function(req, res){
		article.getComment(req, res);
	});
	app.post('/addComment', function(req, res){
		article.addComment(req, res);
	});
	app.get('/classify', function(req, res){
		article.getTags(req, res);
	});	
	app.get('/lastArticle', function(req, res){
		article.getArticles(req, res);
	});
	app.get('/lastComments', function(req, res){
		article.getComments(req, res);
	});
	app.post('/article', function(req, res){
		article.getArticle(req, res);
	});		
}
