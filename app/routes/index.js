import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Foodie | Ora HQ';
  },
  model: function(){
    let blogsController = this.controllerFor('blogs');
    let options = { route: 'blogs' };

    return blogsController.getAjax(options);
  }
});
