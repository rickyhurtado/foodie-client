import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Recipes | Foodie | Ora HQ';
  }
});
