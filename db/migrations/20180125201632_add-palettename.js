exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', function (table) {
      table.string('palette');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('palettes', function (table) {
      table.dropColumn('palette');
    })
  ])
};