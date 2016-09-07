import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Recipes | Foodie | Ora HQ';
  },
  model: function(params){
    let recipes = [];

    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        type: 'GET',
        url: '/recipes?page%5Bnumber%5D=' + params.page,
        cache: false,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/vnd.api+json'
        },
        data: 'json',
        success: function(data){
          recipes = data;
          resolve(recipes);
        },
        error: function(error){
          reject(error);
        }
      });
    });
  }
});
