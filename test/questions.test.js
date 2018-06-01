'use strict';
const {app} = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');

const Questions = require('../models/question');
const seedQuestions = require('../data.js');
const User = require('../models/user');
const seedUsers = require('../users.json');

const expect = chai.expect;

chai.use(chaiHttp);

describe('DuoDragons - Questions', function () {

    let user;
    let token; 
  
    before(function () {
      return mongoose.connect(TEST_DATABASE_URL)
        //.then(() => mongoose.connection.db.dropDatabase());
    });
    // beforeEach(function () {
    //   return User.insertMany(seedUsers)
    //   .then(results => {
    //     user = results[0];
    //     token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
    //     const questionInsertPromise = Questions.insertMany(seedQuestions);
    //     return Promise.all(questionInsertPromise)
    //       .then(() => Questions.ensureIndexes());
    //   })
     
    // });
  
    afterEach(function () {
      return mongoose.connection.db.dropDatabase();
    });
  
    after(function () {
      return mongoose.disconnect();
    });
  
    describe('PUT /api/questions/:id', function () {
      it('should respond with a 404 for an invalid id', function () {
        const updateItem = {
          'title': 'What about dogs?!',
          'content': 'woof woof'
        };
  
        return chai.request(app)
          .put('/api/notes/AAAAAAAAAAAAAAAAAAAAAAAA')
          .set('Authorization', `Bearer ${token}`)
          .send(updateItem)
          .catch(err => err.response)
          .then(res => {
            expect(res).to.have.status(404);
          });
      });
    });
  });