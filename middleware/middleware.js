const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cohortRouter = require('./cohorts');
const studentRouter = require('./students');

module.exports = server => {
  server.use(express.json());
  server.use(morgan('dev'));
  server.use(helmet());
  server.use('/api/cohorts', cohortRouter);
  server.use('/api/students', studentRouter);
}