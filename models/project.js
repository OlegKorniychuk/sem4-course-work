const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'new'
  },
  teamId: {
    type: String
  },
  partialsReady: [{ String }],
  partialsNotReady: [{ String }] 
})

module.exports = new mongoose.model("Project", projectSchema);