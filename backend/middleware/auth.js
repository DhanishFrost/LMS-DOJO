const jwt = require('jsonwebtoken');
const secretKey = 'abc@123'; 
const User = require('../models/userModel'); 

function authorize(role) {
  return async function (req, res, next) {
    const token = req.query.token;
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, secretKey);

      // Check if the decoded token has the required role
      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }

      // Check if the user exists
      const user = await User.findOne(decoded.email);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}


module.exports = authorize;
