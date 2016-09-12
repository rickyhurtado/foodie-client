import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  publishedAt: DS.attr('date'),
  userId: DS.attr('number'),
  categoryId: DS.attr('number'),
  status: DS.attr('string'),
  formattedStatus: function(){
    return Ember.String.capitalize(this.get('status'));
  }.property('status'),
  author: function(){
    return this.get('user.firstName') + ' ' + this.get('user.lastName');
  }.property('user'),
  user: DS.belongsTo('user', { async: true }),
  category: DS.belongsTo('category', { async: true })
});
