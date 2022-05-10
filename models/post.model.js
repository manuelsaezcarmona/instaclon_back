const { Schema, model } = require('mongoose');

const PostSchema = Schema({
  imagepost: {
    type: String,
    required: true,
  },
  textpost: {
    type: String,
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Comment',
    },
  ],
});

module.exports = model('Post', PostSchema);
