const express = require('express');
const server = express();
const configMiddleware = require('./middleware/middleware');

configMiddleware(server);

server.get('/', (req, res) => {
  res.json({ api: 'Welcome to the Lambda student database!' })
})

module.exports = server;