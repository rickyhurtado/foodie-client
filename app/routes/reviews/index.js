import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Reviews | Foodie | Ora HQ';
  },
  model: function(){
    let blogsController = this.controllerFor('blogs');
    let options = { route: 'reviews' };

    return blogsController.getAjax(options);
  }
});
