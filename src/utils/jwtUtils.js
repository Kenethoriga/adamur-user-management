const jwt = require('jsonwebtoken');

function generateToken(userId, expiresIn = '1h') {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
}

module.exports = { generateToken };
