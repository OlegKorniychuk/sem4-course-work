const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
  console.log('GET: /')
  res.redirect('/user');
})

module.exports = router;