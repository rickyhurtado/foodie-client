import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import AuthSessionMixin from '../../../mixins/auth-session-mixin';

export default Ember.Route.extend(AuthSessionMixin, AuthenticatedRouteMixin, {
  activate: function() {
    document.title = 'Blogs | Admin | Ora HQ';
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

    return this.get('store').query('blog', { limit: this.get('limit'), offset: page });
  }
});
