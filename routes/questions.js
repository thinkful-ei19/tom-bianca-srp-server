'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const {LinkedList, displayQuestion, displayAnswer, findPrevious, reverse } = require('../linkedList');
const User = require('../models/user');

const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

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
router.get('/questions/:id', jwtAuth, (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .then((result) => {
      res.end(displayQuestion(result.userQuestions));
    })
    .catch((err) => {
      next(err);
    });
});


// Answer current question
router.post('/questions/:id', jwtAuth, (req, res, next) => {
  console.log('this is req.body', req.body);
  
  User.findById(req.user.id)
    .then((result) => {
      if(true){
      //if (answer === displayAnswer(result.userQuestions)) { 
        //correctCount++;
        //take the list and insert node after the next node
        result.userQuestions.insertAfter(result.userQuestions.next.next);
        //display next question
        // console.log(displayQuestion(result.userQuestions.next));
        res.end(displayQuestion(result.userQuestions.next));
        
      } else {
        //incorrectCount++;
        result.userQuestions.insertAfter(result.userQuestions.next);
        res.end('sorry, try again');
        
      }
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;