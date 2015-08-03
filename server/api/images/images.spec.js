'use strict';

var should = require('should');
var busboy = require('connect-busboy');
app.use(busboy());

describe('GET /api/imagess', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/imagess')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});