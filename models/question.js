'use strict';

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
});

questionSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Question', questionSchema);