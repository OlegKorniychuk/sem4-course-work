const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
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
  currentProject: {
    projectId: {
      type: String,
      required: true
    },
    partials: [{ partialId: String }]
  },
  completedProjects: {
    projectId: String
  }
})

employeeSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

employeeSchema.methods.comparePassword = function(plaintextPassword, callback) {
  bcrypt.compare(plaintextPassword, this.password, (err, isMatch) => {
    if (err) return callback(error);
    callback(null, isMatch);
  })
};

module.exports = mongoose.model('Employee', employeeSchema);
