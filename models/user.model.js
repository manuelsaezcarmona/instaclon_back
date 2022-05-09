const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  postsuser: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post'
    }
  ]
});

module.exports = model('User', UserSchema);
