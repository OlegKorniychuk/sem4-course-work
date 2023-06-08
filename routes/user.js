const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Project = require('../models/project');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();
const upload = require('../middleware/multer');

router.get('/', (req, res) => {
  console.log('GET: /user');
  res.redirect('/user/login')
})

//log in

router.get('/login', (req, res) => {
  console.log('GET: /user/login')
  res.render('login')
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
    res.json({ 
      message: "Logged in successfully", 
      token: token, 
      username: user.username, 
    }) //frontend should store token in local storage and fetch /user/{username}
  })
})

//register

router.get('/register', (req, res) => {
  console.log('GET: /user/register')
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { 
    email: userEmail, 
    username: userName, 
    password, 
    confirmPassword: password2 } = req.body;


  const ifUserExists = await User.findOne({ $or: [ 
    { username: userName }, 
    { email: userEmail } 
  ] })
  .exec();
  if (ifUserExists) {
    return res.json({ message: "This email or username is already taken" });
  }
  if (password !== password2) {
    return res.json({ message: "Passwords don't match" });
  }
  const newUser = new User({
    email: userEmail,
    username: userName,
    password: password,
    isEmployee: false
  })

  await newUser.save()
  res.json({ message: "Registration successful. Go back to log in page" }) //frontend should display a button which will send GET to /user/login
})

//cabinet

router.get('/:username', checkAuth, (req, res) => {
  const username = req.params.username;
  res.json({ yourUsername: username });
})

router.post('/:username/newproject', upload.single('file'), async (req, res) => {
  try {
    const order = {
      name: req.body.projectName,
      sourceFile: req.file.filename
    };
    const user = await User.findOne({ username: req.params.username }).exec();
    user.orders.push(order);
    await user.save();

    const newProject = new Project({
      customer: req.params.username,
      orderId: user.orders[user.orders.length - 1]._id,
    });
    await newProject.save();
    res.json({ message: 'Project created successfuly!' })
  } catch (err) {
    res.json({ err });
  }

})

module.exports = router