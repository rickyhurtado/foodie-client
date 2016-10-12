import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('category', {
  default: { name: 'Post' },
  categoryRecipe: { name: 'Recipe' },
  categoryReview: { name: 'Review' }
});
