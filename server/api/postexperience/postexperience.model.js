'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostexperienceSchema = new Schema({
  name: String,
  experience: String,
  date:Number,
  files:String,
  active: Boolean,
  model:String
});

module.exports = mongoose.model('Postexperience', PostexperienceSchema);