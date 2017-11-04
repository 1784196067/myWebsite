var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/blog');
require('./model/blog_model.js');
require('./model/artical_model.js');
var CommentThread = mongoose.model('CommentThread');
var Reply = mongoose.model('Reply');
var Article = mongoose.model('Article');
var Tag = mongoose.model('Tag');

function add(type){
	CommentThread.find().exec(function(){
   Tag.find().exec(function(){
	Article.find().exec(function(){
		var comment = new CommentThread({title: type});
		var tag = new Tag({tagName: type});
		var article = new Article({title: type, body: "Fine"});
		comment.save(function(err, comment){
			article.commentId = comment.id;
		});
		tag.save(function(err, tag){
			article.tag.push(tag.id);
			article.save(function(err, article){
				console.log(article);
			});
		})
	})
   })
})
}
add('html5');
add('css3');
add('es6');
add('java');
add('js');

