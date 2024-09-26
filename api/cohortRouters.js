const express = require("express");
const router = express.Router();
const db = require("../data/cohortsModel");
// error helper
const errorHelper = (res, code, errMessage, err = "ERROR") => {
  return res.status(code).json({ message: errMessage, err });
};
// Endpoints
// GET all cohorts
router.get("/", (_, res) => {
  db.get()
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => errorHelper(res, 500, "Error fetching", err));
});
// GET cohort by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(cohort => {
      // cohort returns undefined || object
      if (!cohort) return errorHelper(res, 404, `ID: ${id} Not Found`);
      res.status(200).json(cohort);
    })
    .catch(err => errorHelper(res, 500, "Error fetching", err));
});
// GET cohort's students
router.get("/:id/students", (req, res) => {
  const { id } = req.params;
  db.getCohortStudents(id)
    .then(students => {
      console.log("students", students);
      if (students.length === 0)
        return errorHelper(res, 404, "Student(s) not Found");
      res.status(200).json(students);
    })
    .catch(err => errorHelper(res, 500, "Error fetching", err));
});
// POST a new cohort
router.post("/", (req, res) => {
  const name = req.body;
  db.insert(name)
    .then(id => {
      res.status(201).json({ message: `Cohort with id ${id} added` });
    })
    .catch(err => errorHelper(res, 500, "Error Posting", err));
});
// UPDATE existing cohort
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const name = req.body;
  db.update(id, name)
    .then(count => {
      if (count)
        return res.status(200).json({ message: `${count} cohort updated` });
      errorHelper(res, 404, `ID ${id} not found`);
    })
    .catch(err => errorHelper(res, 500, "Error Updating", err));
});
// DELETE existing cohort
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count => {
      if (count)
        return res.status(200).json({ message: `${count} cohort deleted` });
      errorHelper(res, 404, `ID ${id} not found`);
    })
    .catch(err => errorHelper(res, 500, "Error Deleting", err));
});
module.exports = router;
