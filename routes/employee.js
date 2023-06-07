const express = require('express');
const router = express.Router();
const Editor = require('../models/editor');
const Teamlead = require('../models/teamlead');
const Manager = require('../models/manager');

router.post('/login', async (req, res) => {
  const employeeEmail = req.body.email;
  const employeePassword = req.body.password;

  const employee = await Manager.findOne({ email: employeeEmail }).exec() ||
    await Teamlead.findOne({ email: employeeEmail }).exec() ||
    await Editor.findOne({ email: employeeEmail }).exec();
  if (!employee) {
    res.json({ message: "No employee with such an e-mail" });
  }
  const employeeType = employee.constructor.modelName;
  employee.comparePassword(employeePassword, (err, isMatch) => {
    if (err) {
      console.log(err);
      res.status(502).json({ error: "Internal server error" });
    }
    console.log('Password matches:', isMatch);
    if (!isMatch) return res.json({ message: "Invalid password" });

    const token = jwt.sign({ username: employee.username }, process.env.SECRET_KEY, { expiresIn: '24h' });
    res.json({ 
      message: "Logged in successfully", 
      token: token,
      employeeType: employeeType, 
      username: employee.username, 
    }) //frontend should store token in local storage and fetch /employeeType/{username}
  })
  
})

module.exports = router;