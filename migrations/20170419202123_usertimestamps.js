exports.up = function(knex, Promise) {
    return Promise.all([knex.schema.table('users', function(table) {
            table.timestamps();
        })])
};

exports.down = function(knex, Promise) {
    return Promise.all([knex.schema.table('users', function(table) {
            table.dropColumn('created_at');
            table.dropColumn('updated_at');
        })])
};
