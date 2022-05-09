const { Schema, model } = require('mongoose');

const PostSchema = Schema({
  imagepost: {
    type: String,
    required: true
  },
  textpost: {
    type: String
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  comments: [
    {
      commentID: {
        type: Schema.Types.ObjectId,
        required: true
      },
      usercommentID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      textcomment: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = model('Post', PostSchema);
