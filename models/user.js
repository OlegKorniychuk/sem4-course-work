const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
  orders: [{
    name: { type: String, required: true },
    status: { type: String, default: "In process" },
    creationDate: { type: Date, default: Date.now },
    sourceFile: { type: String, required: true }
  }]
})

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(plaintextPassword, callback) {
  bcrypt.compare(plaintextPassword, this.password, (err, isMatch) => {
    if (err) return callback(error);
    callback(null, isMatch);
  })
};

module.exports = mongoose.model('User', userSchema);
