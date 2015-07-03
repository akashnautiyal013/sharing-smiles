'use strict';

var selectcites = require('./selectcites.model');

exports.register = function(socket) {
  selectcites.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  selectcites.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('selectcites:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('selectcites:remove', doc);
}