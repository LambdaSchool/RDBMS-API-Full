const express = require('express');
const helmet = require('helmet');
const knex = require("knex");
const knexConfig = require("./knexfile")

const db = knex(knexConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
    res.status(200).json({api: "running"});
})

server.get("/api/cohorts", (req, res) => {
    db("cohorts")
        .then(cohorts => res.status(200).json(cohorts))
        .catch(err => res.status(500).json({error: err}))
})

server.get("/api/cohorts/:id", (req, res) => {
    const {id} = req.params;

    db("cohorts")
        .where({id})
        .then(cohort => cohort[0] === undefined ? 
            res.status(400).json({error: "Please enter a valid id"}) : 
            res.status(200).json(cohort))
        .catch(err => res.status(500).json({error: err}))
})

server.get("/api/cohorts/:id/students", (req, res) => {
    const {id} = req.params;

    db("students")
        .where({cohort_id: id})
        .then(students => students[0] === undefined ? 
            res.status(400).json({error: "Please enter a valid id"}) : 
            res.status(200).json(students))
        .catch(err => res.status(500).json({error: err}))
})

server.post("/api/cohorts", (req, res) => {
    const changes = req.body;

    if (changes.name === "" || changes.name === undefined) {
        return res.status(400).json({error: "Please make sure the cohort name is indexed."})
    }

    db("cohorts")
        .insert(changes)
        .then(id => res.status(200).json(id))
        .catch(err => res.status(500).json({error: err}))
})

server.put("/api/cohorts/:id", (req, res) => {
    const changes = req.body;
    const {id} = req.params;

    if (changes.name === "" || changes.name === undefined) {
        return res.status(400).json({error: "Please make sure the cohort name is indexed."})
    }

    db("cohorts")
        .where({id})
        .update(changes)
        .then(count => count === 1 ?
            res.status(201).json(count) :
            res.status(400).json({error: "Please enter a valid id"}))
        .catch(err => res.status(500).json({error: err}))
})

server.delete("/api/cohorts/:id", (req, res) => {
    const {id} = req.params;

    db("cohorts")
        .where({id})
        .del()
        .then(count => count === 1 ?
            res.status(201).json(count) :
            res.status(400).json({error: "Please enter a valid id"}))
        .catch(err => res.status(500).json({error: err}))
})

const port = 9001;

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
