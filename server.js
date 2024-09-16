const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const knex = require('./database/db.js');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');
const tagRouter = require('./tags/tagRouter.js');

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Server up and running.' });
});

server.use('/users', userRouter);
server.use('/posts', postRouter);
server.use('/tags', tagRouter);

const port = 5000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});