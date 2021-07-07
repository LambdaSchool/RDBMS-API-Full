const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

//endpoints here

server.get('/', (req, res) => {
  res.send('The server is up and running.');
});

// ============== Users Endpoints ===================

server.post('/users', (req, res) => {
  const user = req.body;
  db.insert(user).into('users').then(ids => {
    const id = ids[0];
    res.status(201).json({ id, ...user})
  })
  .catch(err => res.status(500).json(err))
});

server.get('/users', (req, res) => {
  db('users')
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => res.status(500).json(err));
});

// ============== Posts Endpoints ===================
// =============== Tags Endpoints ===================

const port = 5001;
server.listen(port, function() {
  console.log(`\n ==== Web API Listening on http://localhost:${port} ====\n`);
});