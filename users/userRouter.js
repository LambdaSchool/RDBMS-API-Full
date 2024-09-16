const express = require('express');

const db = require('./userController.js');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  db
    .getUsers()
    .then(users => {
      if (users.length > 0) res.status(200).json(users);
      else res.status(200).json({ message: 'There are no users in the database.' });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the users.' });
    });
});

userRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .getUserById(id)
    .then(users => {
      if (users.length > 0) res.status(200).json(users);
      else res.status(200).json({ message: `There is no user with ID ${id}.` });
    })
    .catch(error => {
      res.status(500).json({ error: `Error retrieving user with ID ${id}.` });
    });
});

userRouter.get('/:id/posts', (req, res) => {
  const { id } = req.params;

  db
    .getPostsByUserId(id)
    .then(userPosts => {
      if (userPosts.length > 0) res.status(200).json(userPosts);
      else (res.status(200).json({ message: `There are no posts by user with ID ${id}.`}));
    })
    .catch(error => {
      res.status(500).json({ error: `Error retrieving posts by user with ID ${id}.` });
    });
});

userRouter.post('/', (req, res) => {
  const user = req.body;

  if (user.name.length > 0) {
    db
      .postUser(user)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(error => {
        res.status(500).json({ error: 'Error saving the user.' });
      });
  } else {
    res.status(500).json({ error: 'You must provide a name.'});
  }
});

userRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (name.length > 0) {
    db
      .putUserById(id, name)
      .then(count => {
        if (count > 0) {
          res.status(201).json({ message: `User ${id} updated successfully.`});
        } else {
          res.status(200).json({ message: `User with ID ${id} not found.` });
        }
      })
      .catch(error => {
        res.status(404).json({ error: `The user with ID ${id} does not exist.` });
      });
  } else {
    res.status(500).json({ error: 'You must provide a name.' });
  };
});

userRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  db
    .deleteUserById(id)
    .then(count => {
      console.log('count: ', count);
      if (count > 0) {
        res.status(200).json({ message: `User ${id} deleted successfully.`});
      } else {
        console.log('in the else');
        res.status(200).json({ message: `User with ID ${id} not found.` });
      };
    })
    .catch(error => {
      console.log('in the error');
      res.status(404).json({ error: `The user with ID ${id} could not be deleted.` });
    });
});

module.exports = userRouter;