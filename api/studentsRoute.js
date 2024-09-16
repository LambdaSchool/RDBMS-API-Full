const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexconfig = require('../knexfile.js');

const db = knex(knexconfig.development);

router.post('/', (req, res) => {
    const student = req.body;
    if (!student.name || !student.cohort_id) {
        res.status(500).json({ error: 'Please provide a name field.' });
    } else {
        db('students')
            .insert(student)
            .then(id => {
                res.status(201).json(id);
            })
            .catch(err => {
                res.status(500).json({ error: 'Error adding student.', err });
            });
    }
});

router.get('/', (req, res) => {
    db('students')
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error fetching students.', err });
        });
});

router.get('/:studentid', async (req, res) => {
    const { studentid } = req.params;

    // db('students')
    //     .where({ id: studentid })
    //     .then(student => {
    //         if (student.length === 0) {
    //             res.status(404).json({ error: 'No student with that ID found.' });
    //         } else {
    //             res.status(200).json(student);
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).json({ error: 'There was an error fetching the cohort.', err });
    //     });

    try {
        let student = await db.select('id', 'name').from('students').where('id', studentid);
        let cohort_id = await db.select('cohort_id').from('students').where('id', studentid);
        let cohort = await db.select('name').from('cohorts').where('id', cohort_id);
        

        res.status(200).json({ student, cohort });
    } catch (err) {
        res.status(500).json({ error: 'There was an error fetching the student.', err });
    }
});

router.put('/:studentid', (req, res) => {
    const changes = req.body;
    const { studentid } = req.params;

    if (!changes.name && !changes.cohort_id) {
        res.status(500).json({ error: 'Please provide name or cohort_id fields in the body.' });
    } else {
        db('students')
            .where({ id: studentid })
            .update(changes)
            .then(count => {
                if (count === 0) {
                    res.status(404).json({ error: 'Student with that ID not found' });
                } else {
                    res.status(200).json(count);
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'There was an error updating the student.', err });
            });
    }
});

router.delete('/:studentid', (req, res) => {
    const { studentid } = req.params;

    db('students')
        .where({ id: studentid })
        .del()
        .then(count => {
            if (count === 0) {
                res.status(404).json({ error: 'Student with that ID not found.' });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'There was an error deleting the student.', err });
        });
});

module.exports = router;