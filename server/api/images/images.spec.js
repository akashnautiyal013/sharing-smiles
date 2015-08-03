'use strict';

var should = require('should');


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