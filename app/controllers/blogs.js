import Ember from 'ember';

export default Ember.Controller.extend({
  getAjax: function(options){
    let page = options && options.page ? '?page%5Bnumber%5D=' + options.page : '';

    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        type: 'GET',
        url: '/' + options.route + page,
        cache: true,
        headers: {
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
