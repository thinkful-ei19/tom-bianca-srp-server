'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const { LinkedList, displayQuestion, displayAnswer, findPrevious, reverse } = require('../linkedList');
const User = require('../models/user');
const questions = require('../questions');


const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });



router.get('/questions', (req, res) => {
  res.json(questions);
});

// Get next question in user list
router.get('/questions/:id', jwtAuth, (req, res, next) => {
  User.findById(req.user.id)
    .then((result) => {
      res.json(displayQuestion(result.userQuestions));
    })
    .catch((err) => {
      next(err);
    });
});


// Answer current question
router.put('/questions', jwtAuth, (req, res, next) => {
  const { id } = req.user;
  const answer = req.body.data;
  let correctCount;
  let incorrectCount;
  // console.log(answer);
  User.findById(id)
    .then((result) => {
      console.log(result.userQuestions.head);
      if (answer === displayAnswer(result.userQuestions).toLowerCase()) {
        let newHead = result.userQuestions.head.next;
        correctCount++;
        let tempNode = result.userQuestions.head;
        while (tempNode.next !== null) {
          tempNode = tempNode.next;
        }
        tempNode.next = result.userQuestions.head;
        tempNode.next.next = null;
        result.userQuestions.head = newHead;

        User.findOneAndUpdate({ _id: id }, { $set: { userQuestions: result.userQuestions } })
          .then(user => {
            res.json(user);
          });
      }
      else {
        incorrectCount++;
        let newHead = result.userQuestions.head.next;
        let tempNode = result.userQuestions.head;
        for (let i = 0; i < 2; i++) {
          tempNode = tempNode.next;
        }
        result.userQuestions.head.next = tempNode.next;
        tempNode.next = result.userQuestions.head;
        result.userQuestions.head = newHead;

        User.findOneAndUpdate({ _id: id }, { $set: { userQuestions: result.userQuestions } })
          .then(user => {
            res.json(user);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;