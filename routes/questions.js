'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const {LinkedList, displayQuestion, displayAnswer, findPrevious, reverse} = require('../linkedList');
const User = require('../models/user');

// router.get('/questions', (req, res) => {
//   // const userId = req.user.id;
//   // let filter = { userId };

//   // if (!mongoose.Types.ObjectId.isValid(id)) {
//   //   const err = new Error('The `id` is not valid');
//   //   err.status = 400;
//   //   return next(err);
//   // }
//   User.find()
//     .then(results => {
//       this.display(results);
//       // res.json(results);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// });


// Get next question in user list
router.get('/questions/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((result) => {
      res.json(displayQuestion(result.userQuestions));
    })
    .catch((err) => {
      next(err);
    });
});


// Answer current question
router.put('/questions/:id', (req, res, next) => {
  const { id } = req.params;
  const {answer} = req.body;
  console.log(answer);
  User.findById(id)
    .then((result) => {
      if (answer === displayAnswer(result.userQuestions)) { 
        res.json(displayQuestion(result.userQuestions.next));
      }
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;