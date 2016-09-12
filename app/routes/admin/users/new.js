import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthSessionMixin from '../../../mixins/auth-session-mixin';

export default Ember.Route.extend(AuthSessionMixin, AuthenticatedRouteMixin, {
  activate: function() {
    document.title = 'New User | Admin | Ora HQ';
  },
  renderTemplate: function(controller, model){
    this._super(controller, model);
    this.initAuthSession();

    if (!this.get('currentUser.isAdmin')){
      this.render('error');
    }
  }
});
