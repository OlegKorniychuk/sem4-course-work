const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  sourceFile: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'new'
  } 
})

module.exports = new mongoose.model("Project", projectSchema);