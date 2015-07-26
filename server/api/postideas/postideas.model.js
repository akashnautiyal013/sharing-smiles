'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostideasSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Postideas', PostideasSchema);