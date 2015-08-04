
'use strict';




var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImagesSchema = new Schema({
  name: String,
  email: String,
  file:String,
  active: Boolean
});

module.exports = mongoose.model('Images', ImagesSchema);
