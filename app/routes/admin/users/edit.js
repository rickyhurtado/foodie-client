import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  activate: function() {
    document.title = 'Edit User | Admin | Ora HQ';
  },
  session: service('session'),
  renderTemplate: function(controller, model){
    this._super(controller, model);

    let adminController = this.controllerFor('admin');

    if (!adminController.currentUser.isAdmin){
      this.render('error');
    }
  }
});
