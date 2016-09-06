import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Foodie | Ora HQ';
  },
  model: function(params){
    let blogs = [];

    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        type: 'GET',
        url: '/blogs?page%5Bnumber%5D=' + params.page,
        cache: false,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        },
        data: 'json',
        success: function(data){
          blogs = data;
          resolve(blogs);
        },
        error: function(error){
          reject(error);
        }
      });
    });
  }
});
