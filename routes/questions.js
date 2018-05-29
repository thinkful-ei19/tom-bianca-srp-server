'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Question = require('../models/question');


router.get('/questions', (req, res) => {
    //const userId = req.user.id;
    // let filter = { userId };
    Question.find()
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            next(err);
        });
});
// Get single question
router.get('/questions/:id', (req, res) => {
   const { id} = req.params;
    Question.findOne({_id: id})
        .then(result => {
                res.json(result);
        })
        .catch(err => {
            next(err);
        });
})

module.exports = router;