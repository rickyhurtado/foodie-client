import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  publishedAt: DS.attr('date'),
  userId: DS.attr('number'),
  categoryId: DS.attr('number'),
  status: DS.attr('string'),
  user: DS.belongsTo('user', { async: true }),
  category: DS.belongsTo('category', { async: true })
});
