'use strict';

var images = require('./images.model');

exports.register = function(socket) {
  images.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  images.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('images:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('images:remove', doc);
}