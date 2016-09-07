import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Posts | Foodie | Ora HQ';
  },
  model: function(params){
    let blogsController = this.controllerFor('blogs');
    let options = { route: 'posts', page: params.page };

    return blogsController.getAjax(options);
  }
});
