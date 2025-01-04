// authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Đăng ký người dùng mới
const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ username, email, password: hashedPassword });

  const token = jwt.sign(
    { user_id: newUser.user_id, username: newUser.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.status(201).json({ token });
};

// Đăng nhập và nhận JWT
const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { user_id: user.user_id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.json({ token });
};

module.exports = { register, login };
