var mongoose = require('mongoose'),
 	CommentThread = mongoose.model('CommentThread'),
 	Reply = mongoose.model('Reply'),
 	Article = mongoose.model('Article'),
 	Tag = mongoose.model('Tag');
exports.getArticles = function(req, res){
	Article.find().limit(5).sort({timestamp: 1}).exec(function(err, articles){
		if(!articles){
			res.json(404,'未找到相关文章！');
		}else{
			res.json(articles);
		}
	})
}
exports.getTags = function(req, res){
	var result = [];
	Tag.find().exec(function(err, tags){
	 if(!tags){
	 	res.json(404,'未找到相关分类！');
	 }else{
		for(var i=0, len=tags.length; i<len; i++){
		   (function(num){
			Article.find({tag: {$all: [tags[num]._id]}}).exec(function(err, articles){
					if(articles){
						result[num] = {
							type: tags[num].tagName,
				 			count: articles.length,
				 			item: articles
				 		};
			 		}
			 	});
			})(i);
		 }
	 }
	});
	setTimeout(function(){res.json(result);}, 2000);
}
exports.getComments = function(req, res){
	CommentThread.find().exec(
		function(err, comments){
		if(!comments){

		}else{
			var result = [];
			for(var i=0, len=comments.length; i<len; i++){
				result.push(comments.replies);
			}
			res.json(result);
		}
	});
};
exports.getComment = function(req, res){
	CommentThread.find({_id: req.query.commentId}).exec(function(err, comment){
		if(!comment){
			res.json(404, {msg: '尚未有评论数据！'});
		}else{
			console.log()
			res.json(comment);
		}
	})
};
exports.addComment = function(req, res){
	console.log("req.body.rootCommentId====>" + req.body.rootCommentId);
	CommentThread.findOne({_id: req.body.rootCommentId})
				.exec(function(err, commentThread){
					if(!commentThread){
						res.json(404, {msg: '没有找到你要找的评论数据！'});
					}else{
						console.log("commentThread====>" + commentThread);
						var newComment = Reply(req.body.newComment);
						addComment(req, res, commentThread, commentThread,
							req.body.parentCommentId, newComment);
					}
				})
};
exports.getArticle = function(req, res){
	Article.find().where('_id', req.body.articleId).exec(
		function(err, article){
			if(!err){
				res.json(article);
			}
		}
	);
}
function addComment(req, res, commentThread, currentComment, parentId, newComment){
	if(commentThread.id == parentId){
		commentThread.replies.push(newComment);
		updateCommentThread(req, res, commentThread);
	}else{
		for(var i=0; i< currentComment.replies.length; i++){
			var c = currentComment.replies[i];
			if(c._id == parentId){
				c.replies.push(newComment);
				updateCommentThread(req, res, commentThread);
				break;
			}else{
				addComment(req, res,commentThread, c, parentId, newComment);
			}
		}
	}
};
function updateCommentThread(req, res, commentThread){
	CommentThread.update({_id: commentThread.id}, {$set:{replies:commentThread.replies}})
		.exec(function(err, savedComment){
			if(err){
				res.json(404, {msg: '更新评论失败！'});
			}else{
				res.json({msg: "success"});
			}
		})
};