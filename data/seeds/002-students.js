exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { cohort_id: 1, name: "Brandon" },
        { cohort_id: 2, name: "Chance" },
        { cohort_id: 2, name: "Calos" },
        { cohort_id: 3, name: "Sarah" }
      ]);
    });
};
