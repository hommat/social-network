const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCommentSchema = new Schema({
  post: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  authorGender: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  likedBy: {
    type: [],
    default: [],
    required: true
  }
});

module.exports = SubComment = mongoose.model("subcomments", SubCommentSchema);