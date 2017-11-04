var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var TagSchema = new Schema({
	tagName: {type: 'String', unique: true}
});
var ArticalSchema = new Schema({
	title: String,
	body: String,
	tag: [Schema.ObjectId],
	timestamp: {type: Date, default: Date.now},
	commentId: Schema.ObjectId
});
mongoose.model('Tag', TagSchema);
mongoose.model('Article', ArticalSchema);