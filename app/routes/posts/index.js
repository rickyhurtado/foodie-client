import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Posts | Foodie | Ora HQ';
  },
  model: function(){
    let blogsController = this.controllerFor('blogs');
    let options = { route: 'posts' };

    return blogsController.getAjax(options);
  }
});
