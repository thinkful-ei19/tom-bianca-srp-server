'use strict';

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  //answered: { type: Boolean },
  //created: { type: Date, default: Date.now },
  // folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
  // tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

questionSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Question', questionSchema);