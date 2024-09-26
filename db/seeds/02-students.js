exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "john", cohort_id: 9 },
        { name: "jon", cohort_id: 2 },
        { name: "jean", cohort_id: 3 }
      ]);
    });
};
