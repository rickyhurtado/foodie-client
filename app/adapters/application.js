import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import AuthSessionMixin from '../mixins/auth-session-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, AuthSessionMixin, {
  authorizer: 'authorizer:devise',
  pathForType: function(type){
    return Ember.String.pluralize(Ember.String.underscore(type));
  },
  headers: Ember.computed('currentUser', function() {
    return {
      X_TOKEN: this.get('currentUser.token'),
      X_EMAIL: this.get('currentUser.email')
    };
  }),
  payloadKeyFromModelName: function(modelName) {
    return Ember.String.singularize(Ember.String.capitalize(modelName));
  }
});
