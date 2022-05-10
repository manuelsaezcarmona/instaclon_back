const bcrypt = require('bcryptjs');
const { createJWT } = require('../helpers/auth.helper');
const User = require('../models/user.model');

const logUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'This user not exists with this email',
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Incorrect Password',
      });
    }

    const token = createJWT(user.id, user.username);

    return res.status(202).json({
      ok: true,
      id: user.id,
      username: user.username,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Please contact the administrator ${error.message}`,
    });
  }
};

module.exports = { logUser };
