const User = require('../models/user.model');

// eslint-disable-next-line consistent-return
const addUser = async (req, res) => {
  const user = req.body;
  const { email } = req.body;
  user.posts = [];

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con ese correo'
      });
    }
    const newUser = new User(user);

    await newUser.save();
    return res.status(201).json({
      ok: true,
      msg: 'usuario creado',
      username: user.username
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Por favor contacte con el administrador${error.message}`
    });
  }
};

module.exports = { addUser };
