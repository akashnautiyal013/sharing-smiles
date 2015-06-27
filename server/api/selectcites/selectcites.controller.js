'use strict';

var _ = require('lodash');
var Selectcites = require('./selectcites.model');

// Get list of selectcitess
exports.index = function(req, res) {
  Selectcites.find(function (err, selectcitess) {
    if(err) { return handleError(res, err); }
    return res.json(200, selectcitess);
  });
};

// Get a single selectcites
exports.show = function(req, res) {
  Selectcites.findById(req.params.id, function (err, selectcites) {
    if(err) { return handleError(res, err); }
    if(!selectcites) { return res.send(404); }
    return res.json(selectcites);
  });
};

// Creates a new selectcites in the DB.
exports.create = function(req, res) {
  Selectcites.create(req.body, function(err, selectcites) {
    if(err) { return handleError(res, err); }
    return res.json(201, selectcites);
  });
};

// Updates an existing selectcites in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Selectcites.findById(req.params.id, function (err, selectcites) {
    if (err) { return handleError(res, err); }
    if(!selectcites) { return res.send(404); }
    var updated = _.merge(selectcites, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, selectcites);
    });
  });
};

// Deletes a selectcites from the DB.
exports.destroy = function(req, res) {
  Selectcites.findById(req.params.id, function (err, selectcites) {
    if(err) { return handleError(res, err); }
    if(!selectcites) { return res.send(404); }
    selectcites.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}