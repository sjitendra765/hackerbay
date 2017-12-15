const jwt = require('jsonwebtoken'),  
      config = require('../config/main');
    
      function generateToken(user) {  
       return jwt.sign(user, config.secret, {
          expiresIn: 10080 // in seconds
        });
      }


exports.login = function(req, res, next) {
 

  
  res.status(200).json({
    token: 'JWT ' + generateToken(req.body),
    user: req.body
  });

}