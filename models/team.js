const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamLeadName: {
    type: String
  },
  teamLeadId: {
    type: String,
  },
  editors: [{
    editorId: {
      type: String,
      required: true
    }
  }],
  currentProjectId: {
    type: String
  }
})

module.exports = mongoose.model('Team', teamSchema);