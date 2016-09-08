import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Blogs by User | Foodie | Ora HQ';
  },
  model: function(params){
    let blogsController = this.controllerFor('blogs');
    let options = { route: 'blogs/user/' + params.user_id, page: params.page };

    return blogsController.getAjax(options);
  }
});
