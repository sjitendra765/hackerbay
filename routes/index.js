const AuthenticationController = require('../controllers/auth'),
      JsonPatchController = require('../controllers/jsonpatch'),
      ThumbnailController = require('../controllers/thumbnail'),
      express = require('express'),
      passportService = require('../config/passport'),
      passport = require('passport');

      // Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const apiRoutes = express.Router(),
        authRoutes = express.Router();
 module.exports = function(app) {


app.post('/login', requireLogin, AuthenticationController.login);

  // Test protected route
  app.get('/protected', requireAuth, (req, res) => {
    res.send({ content: 'The protected test route is functional!' });
  });
  app.post('/jsonpatch', requireAuth,JsonPatchController.createPatch)
  app.post('/thumbnail',requireAuth, ThumbnailController.uploads);

}


