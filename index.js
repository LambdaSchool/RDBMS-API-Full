const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.send("API RUNNING!");
});

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
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

server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .then(id => {
      res.status(200).json(id);
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

const port = 9000;
server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
