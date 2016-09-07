import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Posts | Foodie | Ora HQ';
  },
  model: function(params){
    let posts = [];

    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        type: 'GET',
        url: '/posts?page%5Bnumber%5D=' + params.page,
        cache: false,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        },
        data: 'json',
        success: function(data){
          posts = data;
          resolve(posts);
        },
        error: function(error){
          reject(error);
        }
      });
    });
  }
});
