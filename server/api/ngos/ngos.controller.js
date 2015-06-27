'use strict';

var _ = require('lodash');
var Ngos = require('./ngos.model');

// Get list of ngoss
exports.index = function(req, res) {
  Ngos.find(function (err, ngoss) {
    if(err) { return handleError(res, err); }
    return res.json(200, ngoss);
  });
};

// Get a single ngos
exports.show = function(req, res) {
  Ngos.findById(req.params.id, function (err, ngos) {
    if(err) { return handleError(res, err); }
    if(!ngos) { return res.send(404); }
    return res.json(ngos);
  });
};

// Creates a new ngos in the DB.
exports.create = function(req, res) {
  Ngos.create(req.body, function(err, ngos) {
    if(err) { return handleError(res, err); }
    return res.json(201, ngos);
  });
};

// Updates an existing ngos in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Ngos.findById(req.params.id, function (err, ngos) {
    if (err) { return handleError(res, err); }
    if(!ngos) { return res.send(404); }
    var updated = _.merge(ngos, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, ngos);
    });
  });
};

// Deletes a ngos from the DB.
exports.destroy = function(req, res) {
  Ngos.findById(req.params.id, function (err, ngos) {
    if(err) { return handleError(res, err); }
    if(!ngos) { return res.send(404); }
    ngos.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}