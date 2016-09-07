import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Foodie | Ora HQ';
  },
  model: function(params){
    let blogsController = this.controllerFor('blogs');
    let options = { route: 'blogs', page: params.page };

    return blogsController.getAjax(options);
  }
});
