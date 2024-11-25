const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
const db = knex(knexConfig.development)

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});


server.get('/api/cohorts/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: 'student not found' });
      }
    });
});

server.get('/api/cohorts/:id/students', (req, res) => {
    db('cohorts')
      .where({ id: req.params.id })
      .then(student => {
        if (student) {
          res.status(200).json(student);
        } else {
          res.status(404).json({ message: 'student not found' });
        }
      });
  });
server.post('/api/cohorts', (req, res) => {
  // db.insert(req.body).into('cohorts').then().catch()
  db('cohorts')
    .insert(req.body)
    .then(ids => {
      db('cohorts')
        .where({ id: ids[0] })
        .then(student => {
          res.status(201).json(student);
        });
    })
    .catch(err => res.status(500).json(err));
});


server.delete('/api/cohorts/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

server.put('/api/cohorts/:id', (req, res) => {
  const changes = req.body;

  db('cohorts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'student not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});


server.put('/api/cohorts/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('cohorts')
    .where('id', '=', id) // or .where({ id: id })
    .update(changes)
    .then(count => {
      // count === number of records updated
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


const port = 6000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
