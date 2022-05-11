const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');

const addCommentToPostAndUser = async (postID, userID, commentID) => {
  try {
    const user = await User.findById(userID);
    user.comments = [...user.comments, commentID];
    await user.save();
    const post = await Post.findById(postID);
    post.comments = [...post.comments, commentID];
    await post.save();
  } catch (error) {
    return error.message;
  }
};

const addComment = async (req, res) => {
  const { content, postID } = req.body;
  const { id } = req.user;

  const comment = new Comment({
    content,
    userIDcomment: id,
    postIDcomment: postID,
  });
  try {
    const newComment = await comment.save();

    await addCommentToPostAndUser(
      newComment.postIDcomment,
      newComment.userIDcomment,
      newComment.id
    );

    return res.status(201).json({
      ok: true,
      msg: 'create comment',
      newComment,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Please contact the administrator ${error.message}`,
    });
  }

  console.log(comment);
  return res.json({
    comment,
  });
};

module.exports = { addComment };
