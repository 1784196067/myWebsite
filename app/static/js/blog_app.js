var angular = require('angular');//引入angular
var app = angular.module('app',[]);
function CommentObj($http){
	this.getComment = function(commentId,callback){
		$http.get('/comment', {params: {commentId: commentId}})
			 .then(function(data, status, headers, config){
			 	callback(null, data.data[0]);
			 }, function(data, status, headers, config){
			 	callback(null, {});
			 });
	}
	this.addComment = function(rootCommentId, parentId, newComment, callback){
		$http.post('/addComment', {rootCommentId: rootCommentId,
									parentCommentId: parentId,
									newComment: newComment})
			 .then(function(data, status, headers, config){
			 	callback(null, data.data[0]);
			 	console.log("addComment: " + data);
			 }, function(data, status, headers, config){

			 });
	}
}

app.service('commentSrv', ['$http', CommentObj]);
app.controller('blogController', ['$scope','$http', 'commentSrv', 
				function($scope, $http, commentSrv){
					$http.get('/classify').then(function(data, status, headers, config){
						$scope.tagGroups = data.data;
						console.log("blogController: " + data);
					},function(data, status, headers, config){
						$scope.tagGroups = [];
					});
					$http.get('/lastArticle').then(function(data, status, headers, config){
						$scope.lastArticle = data.data;
						$scope.article = $scope.lastArticle[0];
						$scope.loadComments();
						console.log("lastArticle: " + data);
					}, function(data, status, headers, config){
						$scope.lastArticle = [];
					});
					$http.get('/lastComments').then(function(data, status, headers, config){
						if(data.data){
							$scope.lastComments = data.data;
						}
					}, function(data, status, headers, config){
						$scope.lastComments = [];
					});
					$scope.loadComments = function(){
						commentSrv.getComment($scope.article.commentId, function(err, comment){
							if(err){
								$scope.commentThread = {};
							}else{
								$scope.commentThread = comment;
							}
						})
					};
					$scope.addReply = function(parentCommentId, body){
						var newComment = {subject: body};
						commentSrv.addComment($scope.commentThread._id, $scope.commentThread._id, newComment,
											  function(err, comment){
											  	$scope.body = "";
											  	$scope.loadComments();
											  });
					};
					$scope.setArticle = function(articleId){
						$http.post('/article', {articleId: articleId}).then(function(data){
							$scope.article = data.data[0];
							$scope.loadComments();
						})
					}
				}])