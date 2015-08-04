
'use strict';




var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImagesSchema = new Schema({
  url:String,
  ngoname:String,
  contents:String,
  user:String,
  active: Boolean
});

module.exports = mongoose.model('Images', ImagesSchema);
