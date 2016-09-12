import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  blogs: DS.hasMany('blog', { async:true })
});
