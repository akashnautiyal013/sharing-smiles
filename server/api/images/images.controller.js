'use strict';

var _ = require('lodash');
var Images = require('./images.model');



// Get list of imagess
exports.index = function(req, res) {
  console.log('hur')
  Images.find(function (err, imagess) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(imagess);
  });
};

// Get a single images
exports.show = function(req, res) {
  Images.findById(req.params.id, function (err, images) {
    if(err) { return handleError(res, err); }
    if(!images) { return res.status(404).send('Not Found'); }
    return res.json(images);
  });
};

// Creates a new images in the DB.
exports.create = function(req, res) {
  Images.create(req.body, function(err, images) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(images);
  });
};

// Updates an existing images in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Images.findById(req.params.id, function (err, images) {
    if (err) { return handleError(res, err); }
    if(!images) { return res.status(404).send('Not Found'); }
    var updated = _.merge(images, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(images);
    });
  });
};

// Deletes a images from the DB.
exports.destroy = function(req, res) {
  Images.findById(req.params.id, function (err, images) {
    if(err) { return handleError(res, err); }
    if(!images) { return res.status(404).send('Not Found'); }
    images.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
function file(req, res) {
    var file = req.files.file;
    var tempPath = file.path;
    var path = appDir + '/assets' + '/images' + '/' + file.name;
    console.log(path);

    mv(tempPath, path, function(err) {
        console.log(err);
        if (err){
            res.send(500);
        }else{
            res.send(200);
        }
    });
}