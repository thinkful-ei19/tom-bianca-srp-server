'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Question = require('../models/question');
let questions = [ {'Wife': 'Ābrazÿrys'}, {'Slippery/Sleek': 'Adere'} ];

router.get('/questions', (req, res) => {
    res.json(questions[0]);
    
    //const userId = req.user.id;
    // let filter = { userId };
    // Question.find()
    //     .then(results => {
    //         res.json(results);
    //     })
    //     .catch(err => {
    //         next(err);
    //     });
});
module.exports = router;