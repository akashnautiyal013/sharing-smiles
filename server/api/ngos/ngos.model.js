'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NgosSchema = new Schema({
  name: String,
  city: String,
  category: String,
  info: String,
  position: {
    latitude: String,
    longitude: String
  },
  active: Boolean,
  address: String
});

module.exports = mongoose.model('Ngos', NgosSchema);