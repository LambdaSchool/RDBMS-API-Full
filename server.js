const express = require('express');
const bodyParser = require('body-parser');

const sqlite = require('sqlite3');
const knex = require('./db.js');

const server = express();

server.use(bodyParser.json());


// // endpoints here
server.get('/users', function(req, res) {
    const users = knex('users')
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

server.get('/users/:id', function(req, res) {
    const { id } = req.params;

    const users = knex('users')
        .where('id', id)
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

server.post('/users', function(req, res) {
    const user = req.body;
    knex
        .insert(user)
        .into('users')
        .then(function(ids) {
            res.status(201).json({ ids: ids });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The User already exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

server.post('/posts', function(req, res) {
    const post = req.body;
    knex
        .insert(post)
        .into('posts')
        .then(function(text) {
            res.status(201).json({ text: text });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The Post already exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

server.get('/users/:id/posts', function(req, res) {
    const { id } = req.params;

    const posts = knex('posts')
        .where('usersid', id)
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

server.delete('/users/:id', function(req, res) {
    knex('users')
        .where('id', req.params.id)
        .del()
        .then(function(count) {
            res.status(200).json({ deleted: count });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The User does not exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

server.get('/posts', function(req, res) {
    const posts = knex('posts')
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

server.get('/posts/:id', function(req, res) {
    const { id } = req.params;

    const posts = knex('posts')
        .where('id', id)
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

server.delete('/posts/:id', function(req, res) {
    knex('posts')
        .where('id', req.params.id)
        .del()
        .then(function(count) {
            res.status(200).json({ deleted: count });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The User does not exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

server.post('/tags', function(req, res) {
    const newtag = req.body;
    knex
        .insert(newtag)
        .into('tags')
        .then(function(tag) {
            res.status(201).json({ tag: tag });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The Tag already exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

server.get('/tags', function(req, res) {
    const tags = knex('tags')
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

server.get('/tags/:id', function(req, res) {
    const { id } = req.params;

    const tags = knex('tags')
        .where('id', id)
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

server.delete('/tags/:id', function(req, res) {
    knex('tags')
        .where('id', req.params.id)
        .del()
        .then(function(count) {
            res.status(200).json({ deleted: count });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The Tags does not exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});