
'use strict';


var fs = require('fs');

exports.file = function(req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        var fstream = fs.createWriteStream('./images/' + filename); 
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
};

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImagesSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Images', ImagesSchema);
