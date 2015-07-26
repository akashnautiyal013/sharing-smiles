'use strict';

var _ = require('lodash');
var Postideas = require('./postideas.model');

// Get list of postideass
exports.index = function(req, res) {
  Postideas.find(function (err, postideass) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(postideass);
  });
};

// Get a single postideas
exports.show = function(req, res) {
  Postideas.findById(req.params.id, function (err, postideas) {
    if(err) { return handleError(res, err); }
    if(!postideas) { return res.status(404).send('Not Found'); }
    return res.json(postideas);
  });
};

// Creates a new postideas in the DB.
exports.create = function(req, res) {
  Postideas.create(req.body, function(err, postideas) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(postideas);
  });
};

// Updates an existing postideas in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Postideas.findById(req.params.id, function (err, postideas) {
    if (err) { return handleError(res, err); }
    if(!postideas) { return res.status(404).send('Not Found'); }
    var updated = _.merge(postideas, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(postideas);
    });
  });
};

// Deletes a postideas from the DB.
exports.destroy = function(req, res) {
  Postideas.findById(req.params.id, function (err, postideas) {
    if(err) { return handleError(res, err); }
    if(!postideas) { return res.status(404).send('Not Found'); }
    postideas.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}