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
        msg: 'user exists whith this email',
      });
    }

    const newUser = new User({ username, email, password });

    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    await newUser.save();

    return res.status(201).json({
      ok: true,
      msg: 'create user',
      username,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    return res.status(400).json({
      ok: false,
      msg: 'userid not found',
    });
  }
  try {
    const user = await User.findById(id);
    res.status(200).json({
      ok: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Please contact the administrator ${error.message}`,
    });
  }
};

const updateUser = async (req, res) => {};

module.exports = { addUser, getUserById };
