const express = require('express');
const bodyParser = require('body-parser');

const config = require('./knexfile.js');
const knex  = require ('knex')(config.development);
const sqlite = require ('sqlite3');
const server = express();

server.use(bodyParser.json());

server.post('/users', function(req, res) {
  knex.insert(req.body).into('users')
      .then(function(ids) {
          res.status(201).json({ id: ids[0] });
      })
      .catch(function(error) {
          if (error.code === 'SQLITE_CONSTRAINT') {
            res.status(422).json({ error: 'This name already exist'});
          }
          res.status(500).json({ error });
      });
});

server.get('/users', function(req, res) {
  knex('users')
      .then(function(users) {
          res.status(200).json(users);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.get('/users/:id', function(req, res) {
  const { id } = req.params;
  knex('users')
      .where('id', id)
      .then(function(user) {
          res.status(200).json(user[0]);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.get('/users/:id/posts', function(req, res) {
  const { id } = req.params;
  knex('posts')
      .where('userId', id)
      .then(function(posts) {
          res.status(200).json(posts);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.delete('/users/:id', function(req, res) {
  const { id } = req.params;
  knex('users')
      .where('id', id)
      .del()
      .then(function(q) {
          res.status(200).json(q);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.post('/posts', function(req, res) {
  knex.insert(req.body).into('posts')
      .then(function(ids) {
          res.status(201).json({ id: ids[0] });
      })
      .catch(function(error) {
          if (error.code === 'SQLITE_CONSTRAINT') {
            res.status(422).json({ error: 'This post already exist'});
          }
          res.status(500).json({ error });
      });
});

server.get('/posts', function(req, res) {
  knex('posts')
  .join('users', 'posts.userId', '=', 'users.id')
  .join('posts_tags', 'posts.id', '=', 'posts_tags.postId')
  .join('tags', 'posts_tags.tagId', '=', 'tags.id')
  .select('posts.*', 'users.name', 'tags.tag')
  .then(function(records) {
      res.status(200).json(records);
  }).catch(function(error) {
      res.status(500).json({ error });
  });;
});

server.get('/posts/:id', function(req, res) {
  const { id } = req.params;
  knex('posts')
      .where('id', id)
      .then(function(post) {
          res.status(200).json(post[0]);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.delete('/posts/:id', function(req, res) {
  const { id } = req.params;
  knex('posts')
      .where('id', id)
      .del()
      .then(function(q) {
          res.status(200).json(q);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.post('/tags', function(req, res) {
  knex.insert(req.body).into('tags')
      .then(function(ids) {
          res.status(201).json({ id: ids[0] });
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});


server.get('/tags', function(req, res) {
  knex('tags')
      .then(function(tags) {
          res.status(200).json(tags);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.get('/tags/:id', function(req, res) {
  const { id } = req.params;
  knex('tags')
      .where('id', id)
      .then(function(tag) {
          res.status(200).json(tag[0]);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.delete('/tags/:id', function(req, res) {
  const { id } = req.params;
  knex('tags')
      .where('id', id)
      .del()
      .then(function(q) {
          res.status(200).json(q);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.get('/posts/:id/tags', function(req, res) {
  const { id } = req.params;
  knex('posts_tags')
      .where('postId', id)
      .join('tags', 'posts_tags.tagId', '=', 'tags.id')
      .select('tags.tag')
      .then(function(posts) {
          res.status(200).json(posts);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});