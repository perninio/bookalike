const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  description: Schema.Types.String,
  bookid: Schema.Types.Number,
  userid: Schema.Types.Number,
  rate: {
    type: Schema.Types.Number,
    min: 0.5,
    max: 5
  },
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
