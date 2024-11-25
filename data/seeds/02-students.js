
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('students').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('students').insert([
          {name: 'Joe Mercado', cohort_id: 1},
          {name: 'Lee Lichtsinn', cohort_id: 2},
          {name: 'Christopher Juelfs', cohort_id: 4},
          {name: 'Andres Rivera', cohort_id: 1},
        ]);
      });
  };