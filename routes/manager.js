const express = require('express');
const router = express.Router()
const Manager = require('../models/manager')
const Project = require('../models/project')

router.get('/:username', async (req, res) => {
  const employee = await Manager.findOne({ username: req.params.username }).exec();
  const projects = await Project.findMany({ status: 'new' });
})

module.exports = router;