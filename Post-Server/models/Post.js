const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: Schema.Types.String,
  author: Schema.Types.Number,
  comments: []
});

module.exports = Post = mongoose.model("post", PostSchema);
