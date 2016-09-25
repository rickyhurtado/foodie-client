import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('blog', {
  default: {
    title: 'Post Title',
    body: '<p>Blog post body content.</p>',
    publishedAt: '2016-06-19 00:00:00',
    status: 'Published',
  },
  blogRecipe: {
    title: 'Recipe Title',
    body: '<p>Blog recipe body content.</p>',
    publishedAt: '2016-05-07 00:00:00',
    status: 'Draft'
  }
});
