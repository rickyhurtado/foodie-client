import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Blog | Foodie | Ora HQ';
  }
});
