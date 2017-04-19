exports.up = function(knex, Promise) {
    return Promise.all([knex.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            table.string('name');

        })
        ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([knex.schema.dropTable('users')])
};
