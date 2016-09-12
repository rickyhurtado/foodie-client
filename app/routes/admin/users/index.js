import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthSessionMixin from '../../../mixins/auth-session-mixin';

export default Ember.Route.extend(AuthSessionMixin, AuthenticatedRouteMixin, {
  activate: function() {
    document.title = 'Users | Admin | Ora HQ';
  },
  offset: 0,
  limit: 5,
  queryParams: {
    page: {
      refreshModel: true
    }
  },
  model: function(params){
    let page = 1;

    if (params.page){
      page = params.page;
      page = isNaN(page) ? 1 : Math.floor(Math.abs(page));
    }

    return this.get('store').query('user', { limit: this.get('limit'), offset: page });
  },
  renderTemplate: function(controller, model){
    this._super(controller, model);
    this.initAuthSession();

    if (!this.get('currentUser.isAdmin')){
      this.render('error');
    }
  }
});
