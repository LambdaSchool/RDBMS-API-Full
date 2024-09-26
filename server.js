const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db.js');
const sqlite = require('sqlite3');

const server = express();

server.use(bodyParser.json());

// endpoints here
server.post('/users', function(req, res) {
    const user = req.body;
    db
      .insert(user)
      .into('users')
      .then(function(ids) {
          res.status(201).json({ ids: ids });
      })
      .catch(function(err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
              res.status(422).json({ error: 'User already exists' });
          } else {
              res.status(500).json(err);
          }
      });
});

server.get('/users', function(req, res) {
    db('users')
      .then(function(records) {
          res.status(200).json(records);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.get('/users/:id', function(req, res) {
    const { id } = req.params;

    db('users')
      .where('id', id)
      .then(function(records) {
          res.status(200).json(records);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.get('/users/:id/posts', function(req, res) {
    db
      .select()
      .from('posts')
      .where('userId', req.params.id)
      .then(function(records) {
          res.status(200).json(records);
      })
      .catch(function(error) {
        res.status(500).json({ error });
    });
});

server.delete('/users/:id', function(req, res) {
    db('users')
        .where('id', req.params.id)
        .del()
        .then(function(count) {
            res.status(200).json({ deleted: count });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'User does not exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

server.post('/posts', function(req, res) {
    const post = req.body;
    db
      .insert(post)
      .into('posts')
      .then(function(ids) {
          res.status(201).json({ ids: ids });
      })
      .catch(function(err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
              res.status(422).json({ error: 'Post already exists' });
          } else {
              res.status(500).json(err);
          }
      });
});

server.get('/posts', function(req, res) {
    db('posts')
      .then(function(records) {
          res.status(200).json(records);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.get('/posts/:id', function(req, res) {
    const { id } = req.params;

    db('posts')
      .where('id', id)
      .then(function(records) {
          res.status(200).json(records);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.delete('/posts/:id', function(req, res) {
    db('posts')
        .where('id', req.params.id)
        .del()
        .then(function(count) {
            res.status(200).json({ deleted: count });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'Post does not exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

server.post('/tags', function(req, res) {
    const tag = req.body;
    db
      .insert(tag)
      .into('tags')
      .then(function(ids) {
          res.status(201).json({ ids: ids });
      })
      .catch(function(err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
              res.status(422).json({ error: 'Tag already exists' });
          } else {
              res.status(500).json(err);
          }
      });
});

server.get('/tags', function(req, res) {
    db('tags')
      .then(function(records) {
          res.status(200).json(records);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.get('/tags/:id', function(req, res) {
    const { id } = req.params;

    db('tags')
      .where('id', id)
      .then(function(records) {
          res.status(200).json(records);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.delete('/tags/:id', function(req, res) {
    db('tags')
        .where('id', req.params.id)
        .del()
        .then(function(count) {
            res.status(200).json({ deleted: count });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'Tag does not exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});
