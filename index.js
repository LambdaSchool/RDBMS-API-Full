const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json()); // don't forget this

server.get("/", (req, res) => {
  res.send("API Running...");
});

// add a course
server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;

  // console.log(course);

  // insert into courses () values ()
  // db('courses').insert(course).then().catch()
  db.insert(cohort)
    .into("cohorts")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/cohorts", (req, res) => {
  db("cohorts")
    // .select('name')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  db("cohorts")
    .where({ id })
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => res.status(500).json(err));
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

server.post("/api/cohorts", (req, res) => {
  const cohort = req.body;
  if (cohort.name) {
    db.insert(cohort)
      .into("cohorts")
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the zoo to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide name for the zoo."
    });
  }
});

server.put("/api/cohorts/:id", (req, res) => {
  const cohort = req.body;
  const { id } = req.params;
  db("cohorts")
    .where("id", "=", id)
    .update(cohort)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
