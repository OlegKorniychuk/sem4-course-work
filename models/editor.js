const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const editorSchema = new mongoose.Schema({
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

editorSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

editorSchema.methods.comparePassword = function(plaintextPassword, callback) {
  bcrypt.compare(plaintextPassword, this.password, (err, isMatch) => {
    if (err) return callback(error);
    callback(null, isMatch);
  })
};

module.exports = mongoose.model('Editor', editorSchema);
