const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(f_Pwd, 10);
    const user = new User({ f_userName, f_Pwd: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

exports.login = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  try {
    const user = await User.findOne({ f_userName });
    if (!user) return res.status(400).json({ message: 'Invalid login details' });

    const isMatch = await bcrypt.compare(f_Pwd, user.f_Pwd);
    if (!isMatch) return res.status(400).json({ message: 'Invalid login details' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};
