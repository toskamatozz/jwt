const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('models/user');

const login = async function login(req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    // Password check, user exist
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      // Token generation
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate.id,
      }, 'Keyboard cat', { expiresIn: '1h' });

      res.status(200).json({
        token: `${token}`,
      });
    } else {
      // Incorect password
      res.status(401).json({
        message: 'Incorect password, try again',
      });
    }
  } else {
    // Error
    res.status(404).json({
      message: 'User not found',
    });
  }
};

const register = async function register(req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    res.status(409).json({
      message: 'This email is exist in database, try another email',
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const { password } = req.body;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      // Error
    }
  }
};

module.exports.login = login;
module.exports.register = register;
