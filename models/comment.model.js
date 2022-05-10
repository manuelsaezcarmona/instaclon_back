const { Schema, model } = require('mongoose');

const CommentSchema = Schema({
  commenttext: {
    type: String,
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  postID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
  },
});

module.exports = model('Comment', CommentSchema);
