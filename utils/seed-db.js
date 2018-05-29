'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');
const User = require('../models/user');
const seedUsers = require('../users');
const Question = require('../models/question')
const seedQuestions = require('../questions');

mongoose.connect(DATABASE_URL)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      User.insertMany(seedUsers),
      User.createIndexes(),
      Question.insertMany(seedQuestions)
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });