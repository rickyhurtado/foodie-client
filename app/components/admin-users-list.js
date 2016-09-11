import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  model: [
    { id: 1, firstName: 'Foodie', lastName: 'Admin', role: 'Admin' },
    { id: 2, firstName: 'First', lastName: 'Blogger', role: 'Blogger' },
    { id: 3, firstName: 'Second', lastName: 'Blogger', role: 'Blogger' },
    { id: 4, firstName: 'Third', lastName: 'Blogger', role: 'Blogger' }
  ]
});
