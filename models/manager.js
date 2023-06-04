const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
})

module.exports = new mongoose.model("Manager", managerSchema);