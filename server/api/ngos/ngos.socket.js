'use strict';

var ngos = require('./ngos.model');

exports.register = function(socket) {
  ngos.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ngos.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ngos:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ngos:remove', doc);
}