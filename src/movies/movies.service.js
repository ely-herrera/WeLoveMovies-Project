const knex = require('../db/connection');

function showingTrue() {
  return knex('movies')
    .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
    .select('movies.*')
    .where({ is_showing: true })
    .groupBy('movies.title', 'movies.movie_id', 'movies_theaters.movie_id');
}

function list() {
  return knex('movies').select('*');
}

function read(movie_id) {
  return knex('movies').select('*').where({ movie_id }).first();
}

module.exports = {
  list,
  read,
  showingTrue,
};
