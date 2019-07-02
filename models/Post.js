const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
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

module.exports = Post = mongoose.model("post", PostSchema);
