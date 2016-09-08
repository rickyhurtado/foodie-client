import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Posts | Foodie | Ora HQ';
  },
  model: function(params){
    let blogsController = this.controllerFor('blogs');
    let options = { route: 'blogs/' + params.blog_id };

    return blogsController.getAjax(options);
  }
});
