
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {tag: 'foodTESTTAG'}, // 1
        {tag: 'holidaysTESTTAG'}, // 2
        {tag: 'writingTESTTAG'}, // 3
        {tag: 'petsTESTTAG'}, // 4
        {tag: 'politicsTESTTAG'}, // 5
        {tag: 'religionTESTTAG'}, // 6
        {tag: 'codingTESTTAG'} // 7
      ]);
    });
};
