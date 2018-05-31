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
/*===========insert at========*/ 
function insertAt(index, item) {
  let currNode = result.userQuestions.head.value;
  let prevNode = result.userQuestions.head.value;
  let i = 0;

  while (i !== index) {
    if (!currNode.next) {
      return;
    }
    prevNode = currNode;
    currNode = currNode.next;
    i++;
  }
  if (currNode === null) {
    return;
  }

  return;
}


// Answer current question
router.put('/questions', jwtAuth, (req, res, next) => {
  const { id } = req.user;
  const answer = req.body.data;
  let correctCount;
  let incorrectCount;
  let memVal = 1;
  // console.log(answer);
  User.findById(id)
    .then((result) => {
      if (answer === displayAnswer(result.userQuestions).toLowerCase()) {
        let newHead = result.userQuestions.head.next;
        //making next question the new head
        correctCount++;
        let tempNode = result.userQuestions.head;
        //tempNode.value.memVal = tempNode.value.memVal*2;
        while (tempNode.next !== null) {
          tempNode = tempNode.next;
        }
        // while (tempNode.next.value.memVal > tempNode.value.memVal) {
        //   tempNode = tempNode.next;
        // } 
        //when the next temp node is empty
        //set the correct question to the last one in ll
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
        memVal = 1;
        let newHead = result.userQuestions.head.next;
        let tempNode = result.userQuestions.head;
        for (let i = 0; i < memVal; i++) {
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
      //if memvalue is greater than the length of the list
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;