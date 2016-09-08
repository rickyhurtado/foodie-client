import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Recipes | Foodie | Ora HQ';
  },
  model: function(){
    let blogsController = this.controllerFor('blogs');
    let options = { route: 'recipes' };

    return blogsController.getAjax(options);
  }
});
