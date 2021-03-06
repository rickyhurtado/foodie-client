import Ember from 'ember';
import AuthSessionMixin from '../mixins/auth-session-mixin';

export default Ember.Controller.extend(AuthSessionMixin, {
  getAjax: function(options){
    let self = this;
    let page = options && options.page ? `?page%5Bnumber%5D=${options.page}` : '';

    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        type: 'GET',
        url: `/${options.route}${page}`,
        cache: false,
        headers: {
          'X_TOKEN': self.get('currentUser.token'),
          'X_EMAIL': self.get('currentUser.email'),
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        },
        data: 'json',
        success: function(data){
          resolve(data);
        },
        error: function(error){
          reject(error);
        }
      });
    });
  }
});
