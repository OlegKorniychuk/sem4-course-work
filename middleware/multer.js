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

module.exports = upload;