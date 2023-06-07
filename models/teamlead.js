const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teamleadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true
  },
  currentProjectId: {
    type: String,
  },
  completedProjects: {
    projectId: String
  }
})

teamleadSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

teamleadSchema.methods.comparePassword = function(plaintextPassword, callback) {
  bcrypt.compare(plaintextPassword, this.password, (err, isMatch) => {
    if (err) return callback(error);
    callback(null, isMatch);
  })
};

module.exports = mongoose.model('Teamlead', teamleadSchema);
