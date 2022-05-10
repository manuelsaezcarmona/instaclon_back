const { Schema, model } = require('mongoose');

const CommentSchema = Schema({
  content: {
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
CommentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;

    delete returnedObject._id;
    delete returnedObject._v;
  },
});
module.exports = model('Comment', CommentSchema);
