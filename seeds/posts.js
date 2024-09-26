exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('posts')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('posts').insert([
                { 'id': 1, usersid: 'bob', text: 'thornton' },
                { 'id': 2, usersid: 'bill', text: 'carson' },
                { 'id': 3, usersid: 'billybob', text: 'wee' },
            ]);
        });
  };