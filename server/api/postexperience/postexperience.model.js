'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostexperienceSchema = new Schema({
  name: String,
  experience: String,
  date:Number,
  active: Boolean
});

module.exports = mongoose.model('Postexperience', PostexperienceSchema);