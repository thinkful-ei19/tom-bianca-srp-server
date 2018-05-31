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
  let correct;
  let dragons;
  User.findById(id)
    .then((result) => {
      console.log(result);
      dragons = result.dragons;
      let mValue = result.userQuestions.head.value.mValue;
      // if user response is correct then execute block bellow
      if (answer === displayAnswer(result.userQuestions).toLowerCase()) {
        dragons+=1;
        mValue = mValue * 2;
        let newHead = result.userQuestions.head.next;
        correct = true;
        let tempNode = result.userQuestions.head;
        while (tempNode.next !== null) {
          tempNode = tempNode.next;
        }
        tempNode.next = result.userQuestions.head;
        tempNode.next.next = null;
        result.userQuestions.head = newHead;

        User.updateOne({ _id: id }, { $set: { userQuestions: result.userQuestions , dragons: result.dragons } })
          .then(user => {
            return res.json(user);
          });
      }
      // if user response is NOT correct then execute block bellow
      else {
        correct = false;
        mValue = 1;
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
            return res.json(user);
          });
      }
      res.json({ answer, correct, dragons });
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;