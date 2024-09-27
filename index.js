const express=require('express');
const server=express();
const configMiddleware=require('./config/middleware.js');
const cohorts=require('./cohorts/userRoutes');
const students=require('./students/userRoutes');

server.use('/api/cohorts',cohorts);
server.use('/api/students',students);

const port=9000;
server.listen(port,()=>console.log('Engines firing server starting up new horizons venturing.'))