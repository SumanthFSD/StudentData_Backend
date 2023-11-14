const bcrypt = require('bcrypt');
const User = require('../models/user');

async function signup(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during signup');
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('auth/login', { error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render('auth/login', { error: 'Invalid username or password' });
    }

    req.session.userId = user._id;
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during login');
  }
}

module.exports = { signup, login };
