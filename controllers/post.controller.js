const Post = require('../models/post.model');
const User = require('../models/user.model');

const addPostToUser = async (userid, postid) => {
  try {
    const user = await User.findById(userid);
    user.posts = [...user.posts, postid];
    await user.save();
  } catch (error) {
    return error.message;
  }
};

const deletePostToUser = async (userid, postid) => {
  try {
    const user = await User.findById(userid);

    const postFiltered = user.posts
      .map((post) => post.toString())
      .filter((id) => id !== postid);

    user.posts = postFiltered;
    await user.save();
  } catch (error) {
    return error.message;
  }
};

const addPost = async (req, res) => {
  // TODO - verificar que todos los datos estan en el body
  const { imageURL, text } = req.body;
  const { id } = req.user;

  const post = new Post({ imageURL, text, userID: id });
  try {
    const newPost = await post.save();

    await addPostToUser(id, newPost.id);

    return res.status(201).json({
      ok: true,
      msg: 'create post',
      post,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Please contact the administrator ${error.message}`,
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.user;
  const { postid } = req.params;

  try {
    const post = await Post.findById(postid);

    if (!post) {
      return res.status(404).json({
        ok: false,
        msg: 'this post does not exist',
      });
    }

    if (post.userID.toString() !== id) {
      return res.status(401).json({
        ok: false,
        msg: 'you do not have permission to delete this post',
      });
    }

    const postDeleted = await Post.findByIdAndDelete(postid);

    await deletePostToUser(id, postDeleted.id);

    return res.status(200).json({
      ok: true,
      msg: 'post deleted',
      post: postDeleted,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Please contact the administrator ${error.message}`,
    });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.user;
  const { postid } = req.params;

  try {
    const post = await Post.findById(postid);

    if (!post) {
      return res.status(404).json({
        ok: false,
        msg: 'this post does not exist',
      });
    }
    if (post.userID.toString() !== id) {
      return res.status(401).json({
        ok: false,
        msg: 'you do not have permission to edit this post',
      });
    }

    const postUpdated = await Post.findByIdAndUpdate(postid, req.body, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      msg: 'post updated',
      post: postUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Please contact the administrator ${error.message}`,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userID', {
      username: 1,
      email: 1,
      avatarURL: 1,
    });

    return res.status(200).json({
      ok: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Please contact the administrator ${error.message}`,
    });
  }
};

module.exports = {
  addPost,
  getAllPosts,
  deletePost,
  updatePost,
};
