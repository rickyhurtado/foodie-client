import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthSessionMixin from '../../../mixins/auth-session-mixin';

export default Ember.Route.extend(AuthSessionMixin, AuthenticatedRouteMixin, {
  activate: function() {
    document.title = 'New Blog | Admin | Ora HQ';
  },
  beforeModel: function(){
    this.initAuthSession();

    let store = this.get('store');
    let userId = this.get('currentUser.id');

    store.findAll('category');
    store.findRecord('user', userId);
  }
});
