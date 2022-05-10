const { Schema, model } = require('mongoose');

const PostSchema = Schema({
  imageURL: {
    type: String,
    required: true,
  },
  text: {
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

PostSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;

    delete returnedObject._id;
    delete returnedObject._v;
  },
});
module.exports = model('Post', PostSchema);
