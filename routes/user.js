const express = require('express');
const jwt = require('jsonwebtoken');

const multer = require('multer');

const User = require('../models/user');
const Project = require('../models/project');
const checkAuth = require('../middleware/checkAuth');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/data");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const username = req.params.username;
    const date = Date.now();
    cb(null, `${username}-${file.fieldname}-${date}.${ext}`);
  }
})
const multerFilter = (req, file, cb) => {
  if (file.mimtype.split('/')[1] === 'txt') {
    cb(null, true);
  } else {
    cb(new Error('File extension should be txt!'), false);
  }
}
const upload = multer({
  storage: multerStorage,
  filter: multerFilter 
})

const router = express.Router();

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
      token, 
      username: user.username, 
      isEmployee: user.isEmployee 
    }) //frontend should store token in local storage and fetch /user/{username} if isEmployee == false
  })
})

//register

router.get('/register', (req, res) => {
  console.log('GET: /user/register')
  res.render('register')
})

router.post('/register', async (req, res) => {
  const userEmail = req.body.email
  const userName = req.body.username
  const password = req.body.password
  const password2 = req.body.confirmPassword

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
    const newProject = new Project({
      customer: req.body.username,
      sourceFile: req.file.filename,
      name: req.body.projectName
    });
    await newProject.save();
    res.json({ message: 'Project created successfuly!' })
  } catch (err) {
    res.json({ err });
  }

})

module.exports = router