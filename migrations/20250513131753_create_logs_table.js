/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  // Create the 'logs' table with the specified columns
  return knex.schema.createTable('logs', function(table) {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.timestamp('timestamp').defaultTo(knex.fn.now()); // Log timestamp, defaults to now
    table.string('level', 20); // Log level (e.g., info, warn, error)
    table.text('message'); // Log message
    table.string('source', 100); // Source application/service
    table.jsonb('metadata'); // Additional metadata as JSON
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Record creation timestamp
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  // Drop the 'logs' table if it exists
  return knex.schema.dropTableIfExists('logs');
};
