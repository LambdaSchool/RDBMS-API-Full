exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('users', table => {
            table.increments();
            table.text('name').notNullable();
            table.integer('createdAt').defaultTo(knex.fn.now()).notNullable();
        })
        .createTable('posts', table => {
            table.increments();
            table.integer('userId').notNullable();
            table.text('text').notNullable();
            table.integer('createdAt').defaultTo(knex.fn.now()).notNullable();
        })
        .createTable('tags', table => {
            table.increments();
            table.text('tag').notNullable().unique();
            table.integer('createdAt').defaultTo(knex.fn.now()).notNullable();
        })
        .createTable('posttags', table => {
            table.increments();
            table.integer('postId').notNullable().unsigned().references('id').inTable('posts');
            table.integer('tagId').notNullable().unsigned().references('id').inTable('tags');
        })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('posttags').dropTableIfExists('tags').dropTableIfExists('posts').dropTableIfExists('users');
};
