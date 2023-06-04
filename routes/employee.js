const express = require('express');
const router = express.Router()
const Employee = require('../models/employee')

router.get('/:username', async (req, res) => {
  const employee = await Employee.findOne({ username: req.params.username }).exec();
  res.json({ projects: employee.projects })
})

module.exports = router;