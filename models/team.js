const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamLeadId: {
    type: String,
    required: true
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