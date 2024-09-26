const express = require('express');
const helmet = require('helmet');

const chrtRts = require('./chrt/chrtRts');
const stdtRts = require('./stdt/stdtRts');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.use('/api/chrt', chrtRts);
server.use('/api/stdt', stdtRts);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});