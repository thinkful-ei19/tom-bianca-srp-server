'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const { PORT, CLIENT_ORIGIN } = require('./config');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');
const { dbConnect } = require('./db-mongoose');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const questionRouter = require('./routes/questions');


// Utilize the given `strategy`
passport.use(localStrategy);
passport.use(jwtStrategy);

// Create an Express application
const app = express();

// Log all requests. Skip logging during
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// Utilize the Express static webserver, passing in the directory name
app.use(express.static('public'));

// Utilize the Express `.json()` body parser
app.use(express.json());

// Mount routers
app.use('/api', usersRouter);
app.use('/api', authRouter);
app.use('/api', questionRouter);

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
