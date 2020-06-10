// the changes we want to make
exports.up = function(knex) {
  return knex.schema.createTable('carInfo', tbl => {
    tbl.increments();
    tbl.string('VIN', 128).notNullable().unique();
    tbl.string('make', 128).notNullable();
    tbl.string('model', 128).notNullable();
    tbl.integer('mileage', 12).notNullable();
    tbl.string('transmission', 128);
    tbl.string('title', 128);
  })
};

// undo the changes
exports.down = function (knex) {
  // drop the cars table
  return knex.schema.dropTableIfExists('carInfo')
};
