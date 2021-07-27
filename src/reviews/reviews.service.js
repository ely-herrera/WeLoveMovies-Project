const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

const addCritic = mapProperties({
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
});

function list(movieId) {
  return knex('reviews')
    .join('critics', 'reviews.critic_id', 'critics.critic_id')
    .select('reviews.*', 'critics.*')
    .where({ 'reviews.movie_id': movieId })
    .then((data) => data.map((index) => addCritic(index)));
}

function read(review_id) {
  return knex('reviews').select('*').where({ review_id }).first();
}

function update(updatedReview) {
  return knex('reviews')
    .select('*')
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, '*')
    .then((updatedReviews) => updatedReviews[0]);
}

function destroy(review_id) {
  return knex('reviews').where({ review_id }).del();
}

module.exports = {
  list,
  read,
  update,
  destroy,
};
