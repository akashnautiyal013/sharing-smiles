'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NgosSchema = new Schema({
  name: String,
  city:String,
  category:String,
  info:String,
 
  active: Boolean
});

module.exports = mongoose.model('Ngos', NgosSchema);