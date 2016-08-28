import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Sign In | Foodie | Ora HQ';
  }
});
