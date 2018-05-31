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
<<<<<<< HEAD
      
=======
      console.log(result.userQuestions);
>>>>>>> 7e864a8e473d7edc86c6e23a2cf7e37d1d9f4793
      res.end(displayQuestion(result.userQuestions));
    })
    .catch((err) => {
      next(err);
    });
});


// Answer current question
<<<<<<< HEAD
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
=======
router.post('/questions/:id', jwtAuth, (req, res, next) => {
  console.log('this is req.body', req.body.content);
  //when using postman we get the req.body otherwise undefined
  User.findById(req.user.id)
    .then((result) => {
      console.log(result.userQuestions);
      //shows in brower not in postman
      if(displayAnswer(result.userQuestions) === req.body.content){
      //if (answer === displayAnswer(result.userQuestions)) { 
        //correctCount++;
        //take the list and insert node after the next node
        //result.userQuestions.insertAfter(result.userQuestions.next.next);
        //display next question
        // console.log(displayQuestion(result.userQuestions.next));
        res.end(displayQuestion(result.userQuestions.next));
        
      } else {
        //incorrectCount++;
        result.userQuestions.insertAfter(result.userQuestions.next);
        res.end('sorry, try again');
        
>>>>>>> 7e864a8e473d7edc86c6e23a2cf7e37d1d9f4793
      }
    })
    .then(() => {
      return res.json({ answer });
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;