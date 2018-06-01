'use strict';
const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');

const User = require('../models/user');
const seedUsers = require('../users.json');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Learning High Valyrian Login', function(){
    let token;
    const fullname = 'Example User';
    const username = 'exampleUser';
    const password = 'examplePass';
    before(function() {
        return mongoose.connect(TEST_DATABASE_URL)
           .then(() => mongoose.connect.db.dropDatabase());
    });
    beforeEach(function() {
        return User.insertMany(seedUsers);
    });
    
    afterEach(function () {
        return mongoose.connection.db.dropDatabase();
    });
    after(function () {
        return mongoose.disconnect();
    });
    
    describe('Learning High Valyrian', function() {
        it('Should return a valid auth token', function () {
            const { _id: id, username, fullname} = seedUsers[0];
            return chai.request(app)
            .post('/api/login')
            .send({ username, password: 'password' })
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.authToken).to.be.a('string');

                const payload = jwt.verify(res.body.authToken, JWT_SECRET);

                expect(payload.user).to.not.have.property('password');
                expect(payload.user).to.deep.equal({id, username, fullname});
            });
        });
        it('Should reject requests with no credentials', function () {
            return chai.request(app)
            .post('/api/login')
            .catch(err => err.response)
            .then(res => {
                expect(res).to.have.status(400);
            });
        });
        it('Should reject requests with incorrect usernames', function () {
            const testUser = { username: 'wrongUsername', password };
            return chai.request(app)
            .post('/api/login')
            .send(testUser)
            .catch(err => err.response)
            .then(res => {
                expect(res).to.have.status(401);
            });
        });
        it('Should reject requests with incorrect passwords', function () {
            const testUser = { username, password: 'wrongPassword' };
            return chai.request(app)
            .post('/api/login')
            .send(testUser)
            .catch(err => err.response)
            .then(res => {
                expect(res).to.have.status(401);
            });
        });
    });
    describe('/api/refresh', function () {
        it('Should reject requests with no credentials', function () {
            return chai.request(app)
            .post('/api/refresh')
            .catch(err => err.response)
            .then(res => {
                expect(res).to.have.status(401);
            });
        });
        it('Should reject requests with invalid token', function () {
            const token = jwt.sign({ username, fullname }, 'wrongSecret');
            return chai.request(app)
            .post('/api/refresh')
            .set('Authorization', `Bearer ${token}`)
            .catch(err => err.response)
            .then(res => {
                expect(res).to.have.status(401);
            });
        });
        it('Should reject requests with expired token', function () {
            const token = jwt.sign({ username, fullname }, JWT_SECRET, { subject: username, expiresIn: Math.floor(Date.now() / 100) - 10});
            return chai.request(app)
            .post('/api/refresh')
            .set('Authorization', `Bearer ${token}`)
            .catch(err => err.response)
            .then(res => {
                expect(res).to.have.status(401);
            });
        });
        it('Should return a valid auth token with a newer expiry date', function () {
            const user = { username, fullname };
            const token = jwt.sign({ user }, JWT_SECRET, { algorithm: 'HS256', subject: username, expiresIn: '7d'} );
            const decoded = jwt.decode(token);
            return chai.request(app)
            .post('/api/refresh')
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                const token = res.body.authToken;
                expect(token).to.be.a('string');
                const payload = jwt.verify(token, JWT_SECRET);
                expect(payload.user).to.deep.equal({ username, fullname });
                expect(payload.exp).to.be.at.least(decoded.exp);
            });
        });
    });
});
