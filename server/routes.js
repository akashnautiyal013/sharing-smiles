/**
 * Main application routes
 */

'use strict';


var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/postideass', require('./api/postideas'));
  app.use('/api/postexperiences', require('./api/postexperience'));
  app.use('/api/ngoss', require('./api/ngos'));
  app.use('/api/selectcitess', require('./api/selectcites'));
  app.use('/api/imagess', require('./api/images'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
