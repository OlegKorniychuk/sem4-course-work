const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  teamNumber: {
    type: Number
  },
  projects: [
    {
      projectId: String,
      status: String,
      readiness: Number,
      dueDate: Date
    }
  ]
})

module.exports = new mongoose.model("Employee", employeeSchema);