const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.use(function(err, req, res, next) {
  res.status(500).json({ msg: "try again" });
});

// errorHandler(res, status, msg) {
//     return res.status(status).json({ msg }

server.get("/", (req, res) => {
  res.send("API RUNNING!");
});

server.get("/api/cohorts", (req, res, next) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(next);
});

server.get("/api/cohorts/:id", (req, res, next) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id })
    .then(id => {
      res.status(200).json(id);
    })
    .catch(next)
    console.log(next)
    });


server.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;

  db("students")
    .where({ cohort_id: id })
    .select("name")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      console.error(
        `There was an error in your Get function: \n === ${err} ===`
      );
      res.status(500).json({
        errMsg: "Unable to fetch the Data you were looking for"
      });
    });
});

server.post("/api/cohorts/", (req, res) => {
  const body = req.body;

  db.insert(body)
    .into("cohorts")
    .then(body => {
      res.status(201).json(body);
    })
    .catch(err => {
      console.error(
        `There was an error in your Post function: \n === ${err} ===`
      );
      res.status(500).json({
        errMsg: "Unable to post"
      });
    });
});

server.put("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;

  db("cohorts")
    .where({ id })
    .update(body)
    .then(id => {
      res.status(200).json(id);
    })
    .catch(err => {
      console.error(
        `There was an error in your PUT function: \n === ${err} ===`
      );
      res.status(500).json({
        errMsg: "Unable to modify target data"
      });
    });
});

server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .del()
    .where({ id })
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.error(
        `There was an error in your delete function: \n === ${err} ===`
      );
      res.status(500).json({
        errMsg: "Unable to delete requested cohort"
      });
    });
});

server.get("/api/students", (req, res) => {
  db("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      console.error(
        `There was an error in your delete function: \n === ${err} ===`
      );
      res.status(500).json({
        errMsg: "Unable to fetch student data"
      });
    });
});

const port = 9000;
server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
