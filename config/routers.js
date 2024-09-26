const cohortRouters = require('../api/cohortRouters');
const studentRouters = require('../api/studentRouters');

const cohorts = server => {
  server.use('/api/cohorts', cohortRouters);
};

const students = server => {
  server.use('/api/students', studentRouters);
};

module.exports = {
  cohortRouters: cohorts,
  studentRouters: students
};