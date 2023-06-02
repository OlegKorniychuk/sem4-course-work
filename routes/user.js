const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/user');
const checkAuth = require('../middleware/checkAuth');

router.get('/', (req, res) => {
  console.log('GET: /user');
  res.redirect('/user/login')
})

//log in

router.get('/login', (req, res) => {
  console.log('GET: /user/login')
  res.render('index')
})

router.post('/login', async (req, res) => {
  const userEmail = req.body.email
  const userPassword = req.body.password
  
  const user = await User.findOne({ email: userEmail }).exec();
  console.log(user.username)
  if (!user) return res.json({ message: "Invalid e-mail" })

  user.comparePassword(userPassword, (err, isMatch) => {
    if (err) throw err;
    console.log('Password matches:', isMatch);
    if (!isMatch) return res.json({ message: "Invalid password" });

    const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '24h' });
    res.json({ message: "Logged in successfully", token, isEmployee: user.isEmployee })
  })
})

//cabinet

router.get('/:username', checkAuth, (req, res) => {
  const username = req.params.username;
  res.json({ yourUsername: username });
})

module.exports = router