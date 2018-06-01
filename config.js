'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  //CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://learn-high-valyrian.netlify.com/login',
  DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://dev:dev@ds237660.mlab.com:37660/tom-bianca-srp',
  TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        'mongodb://localhost/thinkful-backend-test',

  JWT_SECRET: process.env.JWT_SECRET || 'matcha-latte',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
  // DATABASE_URL:
  //     process.env.DATABASE_URL || 'postgres://localhost/thinkful-backend',
  // TEST_DATABASE_URL:
  //     process.env.TEST_DATABASE_URL ||
  //     'postgres://localhost/thinkful-backend-test'
};
