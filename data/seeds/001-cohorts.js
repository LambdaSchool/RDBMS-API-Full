exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('cohorts').truncate()
    .then(function () {
        // Inserts seed entries
        return knex('cohorts').insert([
        { name: 'FSW14' },
        { name: 'FSW15' },
        { name: 'FSW16' }
        ]);
    });
};