import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  activate: function() {
    document.title = 'Dashboard | Admin | Ora HQ';
  },
  session: service('session'),
  actions: {
    signOut() {
      this.get('session').invalidate();
    }
  }
});
