'use strict';

var _ = require('lodash');
var Postexperience = require('./postexperience.model');

// Get list of postexperiences
exports.index = function(req, res) {
  Postexperience.find(function (err, postexperiences) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(postexperiences);
  });
};

// Get a single postexperience
exports.show = function(req, res) {
  Postexperience.findById(req.params.id, function (err, postexperience) {
    if(err) { return handleError(res, err); }
    if(!postexperience) { return res.status(404).send('Not Found'); }
    return res.json(postexperience);
  });
};

// Creates a new postexperience in the DB.
exports.create = function(req, res) {


  Postexperience.create(req.body, function(err, postexperience) {
    if(err) { return handleError(res, err); }
    return ;
  });
};

// Updates an existing postexperience in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Postexperience.findById(req.params.id, function (err, postexperience) {
    if (err) { return handleError(res, err); }
    if(!postexperience) { return res.status(404).send('Not Found'); }
    var updated = _.merge(postexperience, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(postexperience);
    });
  });
};

// Deletes a postexperience from the DB.
exports.destroy = function(req, res) {
  Postexperience.findById(req.params.id, function (err, postexperience) {
    if(err) { return handleError(res, err); }
    if(!postexperience) { return res.status(404).send('Not Found'); }
    postexperience.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}