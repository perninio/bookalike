const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PostsDB', {useUnifiedTopology: true ,useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected')
});

var Schema = mongoose.Schema;
//defining doccument fields
  var postSchema = new Schema({
    author: String,//author=userid 
    posttext:   String,
    comments: [{ userid: String, body: String, date: { type: Date,default: Date.now}, meta: [{ likes: Number, userid: String}]}],//list off comments under the post
    date: { type: Date, default: Date.now },
    scope: String, //defines who will be able to see this post (public,friends) only
    meta: [{ likes: Number, userID: String}]
  });
  
  var bookcommentsSchema = new Schema({
    bookid: String,
    comments: [{ userid: String, body: String, meta: [{ likes: Number, userid: String}] }],
    date: { type: Date, default: Date.now },
  });

var Post = mongoose.model('post', postSchema);//collection posts
var Bookcomments = mongoose.model('bookcomment', bookcommentsSchema);//collection bookcomment

//statics are the methods defined on the Model. methods are defined on the document (instance).

postSchema.statics.findPostsByUserId = function(uid) {//will return all posts for user wall
    return this.find({ userid: uid });
  };

