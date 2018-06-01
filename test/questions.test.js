'use strict';
const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');

const Questions = require('../models/question');
const seedQuestions = require('../data.js');

const expect = chai.expect;

chai.use(chaiHttp);