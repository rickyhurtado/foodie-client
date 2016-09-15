import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthSessionMixin from '../../../mixins/auth-session-mixin';

export default Ember.Route.extend(AuthSessionMixin, AuthenticatedRouteMixin, {
  activate: function() {
    document.title = 'Edit User | Admin | Ora HQ';
  },
  model: function(params){
    let store = this.get('store');

    return store.findRecord('user', params.id);
  },
  renderTemplate: function(controller, model){
    this._super(controller, model);
    this.initAuthSession();

    if (!this.get('currentUser.isAdmin')){
      this.render('error');
    }
  }
});
