'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SelectcitesSchema = new Schema({
  name: String,
  latitude:String,
  longitude:String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Selectcites', SelectcitesSchema);