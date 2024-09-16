const express = require('express');
const knex = require('knex');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// USERS CRUD
server.get('/users', async (req, res) => {
  try {
    const users = await db('Users');
    res.status(200).json(users);
  } catch(err) {
    res.status(500).send(`Error: ${err}`);
  }
});
 server.post('/users', async (req,  res) => {
  const name = req.body;
  try {
    const ids = await db.insert(name).into('users');
    const id = ids[0];
    res.status(201).json({id, ...name});
  } catch(err) {
    res.status(500).send(`Error ${err}`);
  }
})
 server.delete('/users/:id', async (req, res) => {
  try {
    const result = await db('Users').where('id', req.params.id).del();
    res.status(200).json(result);
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})
 server.put('/users/:id', async (req, res) => {
  const name = req.body;
  try {
    const index = await db('users').where('id', req.params.id).update(name);
    if (index > 0) return res.status(200).json(await db('Users').where('id', req.params.id).first()); //any point to this .first()?
    res.status(200).send("If didn't trigger");
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})

// POSTS CRUD
server.get('/posts', async (req, res) => {
  try {
    const posts = await db('posts');
    res.status(200).json(posts);
  } catch(err) {
    res.status(500).send(`You done goofed with ${err}`);
  }
});
 server.post('/posts', async (req,  res) => {
  const {userId, text} = req.body;
  try {
    const ids = await db.insert({userId, text}).into('posts');
    const id = ids[0];
    res.status(201).json(await db('posts').where('id', id));
  } catch(err) {
    res.status(500).send(`Ya done goofed with ${err}`);
  }
})
 server.delete('/posts/:id', async (req, res) => {
  try {
    const result = await db('posts').where('id', req.params.id).del();
    res.status(200).json(result);
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})
 server.put('/posts/:id', async (req, res) => {
  const {userId, text} = req.body;
  try {
    const index = await db('posts').where('id', req.params.id).update({userId, text});
    if (index > 0) return res.status(200).json(await db('posts').where('id', req.params.id)); //any point to this .first()?
    res.status(200).send("It didn't trigger");
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});



