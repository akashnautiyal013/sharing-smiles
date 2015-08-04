'use strict';

var postexperience = require('./postexperience.model');

exports.register = function(socket) {
  postexperience.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
postexperience.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}
function onSave(socket, doc, cb) {
     socket.emit('postexperience:save', doc);
}


function onRemove(socket, doc, cb) {
  socket.emit('postexperience:remove', doc);
}



