exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "CS1", id: 1},
        { name: "CS2" , id: 2},
        { name: "CS3", id: 3 }
      ]);
    });
};
