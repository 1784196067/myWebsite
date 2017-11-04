var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ReplySchema = new Schema();
ReplySchema.add({
	subject: String,
	timeStamp: {type: Date, default: Date.now},
	replies: [ReplySchema]
});

var CommentThreadSchema = new Schema({
	title: String,
	replies: [ReplySchema]
});

mongoose.model('Reply', ReplySchema);
mongoose.model('CommentThread', CommentThreadSchema);