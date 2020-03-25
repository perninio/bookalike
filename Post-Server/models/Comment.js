const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  title: Schema.Types.String,
  author: Schema.Types.Number,
  comments: []
});

module.exports = Comment = mongoose.model("comment", CommentSchema);
