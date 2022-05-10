const Post = require('../models/post.model');

const addPost = async (req, res) => {
  // TODO - verificar que todos los datos estan en el body
  const { imageURL, text } = req.body;
  const { id } = req.user;

  const post = new Post({ imageURL, text, userID: id });
  try {
    await post.save();

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

module.exports = { addPost };
