import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthSessionMixin from '../../../mixins/auth-session-mixin';

export default Ember.Route.extend(AuthSessionMixin, AuthenticatedRouteMixin, {
  activate: function() {
    document.title = 'Edit Blog | Admin | Ora HQ';
  },
  model: function(params){
    let store = this.get('store');

    return store.findRecord('blog', params.id);
  }
});
