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

const addPost = async (req, res) => {
  // TODO - verificar que todos los datos estan en el body
  const { imageURL, text } = req.body;
  const { id } = req.user;

  const post = new Post({ imageURL, text, userID: id });
  try {
    const postcreated = await post.save();

    await addPostToUser(id, postcreated.id);

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

module.exports = { addPost, getAllPosts };
