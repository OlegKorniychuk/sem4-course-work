const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const managerSchema = new mongoose.Schema({
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
  }
})

managerSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

managerSchema.methods.comparePassword = function(plaintextPassword, callback) {
  bcrypt.compare(plaintextPassword, this.password, (err, isMatch) => {
    if (err) return callback(error);
    callback(null, isMatch);
  })
};

module.exports = mongoose.model('Manager', managerSchema);
