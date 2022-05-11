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
};

const deleteCommentToPostAndUser = async (postID, userID, commentID) => {
  try {
    const user = await User.findById(userID);
    const userCommentsFiltered = user.comments
      .map((comment) => comment.toString())
      .filter((id) => id !== commentID);
    user.comments = userCommentsFiltered;
    await user.save();

    const post = await Post.findById(postID);

    const postCommentsFiltered = post.comments
      .map((comment) => comment.toString())
      .filter((id) => id !== commentID);

    post.comments = postCommentsFiltered;
    await post.save();
  } catch (error) {
    return error.message;
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.user;
  const { commentid } = req.params;

  try {
    const comment = await Comment.findById(commentid);

    const post = await Post.findById(comment.postIDcomment);

    if (!comment) {
      return res.status(404).json({
        ok: false,
        msg: 'this comment does not exist',
      });
    }

    if (
      comment.userIDcomment.toString() !== id ||
      post.userID.toString() !== id
    ) {
      return res.status(401).json({
        ok: false,
        msg: 'you do not have permission to delete this post',
      });
    }

    const commentDeleted = await Comment.findByIdAndDelete(commentid);

    await deleteCommentToPostAndUser(
      commentDeleted.postIDcomment,
      id,
      commentid
    );
    return res.status(201).json({
      ok: true,
      msg: 'delete comment',
      commentDeleted,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Please contact the administrator ${error.message}`,
    });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find();

    return res.status(201).json({
      ok: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Please contact the administrator ${error.message}`,
    });
  }
};
module.exports = { addComment, deleteComment, getCommentsByPost };
