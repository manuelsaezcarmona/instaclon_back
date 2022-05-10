const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

// eslint-disable-next-line consistent-return
const addUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con ese correo',
      });
    }
    const userContent = { username, email, password };
    userContent.posts = [];
    userContent.comments = [];

    const newUser = new User(userContent);

    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(userContent.password, salt);

    await newUser.save();

    return res.status(201).json({
      ok: true,
      msg: 'create user',
      username: newUser.username,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

module.exports = { addUser };
