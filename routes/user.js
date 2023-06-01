const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  console.log(`Authorization attempt: email=${email}, password=${password}`)
  res.send(req.body)
})

module.exports = router