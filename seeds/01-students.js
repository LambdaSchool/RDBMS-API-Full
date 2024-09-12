
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { id: 1, colName: 'Arthur Bates', cohorts_id: 1 },
        { id: 2, colName: 'Some Body', cohorts_id: 2 },
        { id: 3, colName: 'Someone Else', cohorts_id: 3 }
      ]);
    });
};
