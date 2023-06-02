const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const token = req.headers['authtoken'];
  if (!token) {
      return res.status(403).json({ message: 'No authentication token' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }

      req.username = decoded.username;
      next();
  });
};

module.exports = checkAuth;