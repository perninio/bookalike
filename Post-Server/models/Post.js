const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: Schema.Types.String,
  description: Schema.Types.String,
  userid: Schema.Types.Number,
  scope: {
    type: Schema.Types.String,
    enum: ["public", "friends", "private"]
  },
  comments: [
    {
      _id: Schema.Types.ObjectId,
      comment: Schema.Types.String,
      userid: Schema.Types.Number
    }
  ]
});

module.exports = Post = mongoose.model("post", PostSchema);
