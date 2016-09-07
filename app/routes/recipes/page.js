import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Recipes | Foodie | Ora HQ';
  },
  model: function(params){
    let blogsController = this.controllerFor('blogs');
    let options = { route: 'recipes', page: params.page };

    return blogsController.getAjax(options);
  }
});
