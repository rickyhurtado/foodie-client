import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Blogs by User | Foodie | Ora HQ';
  },
  model: function(params){
    let user_id = window.location.pathname.split('/')[3];
    let blogsController = this.controllerFor('blogs');
    let options = { route: 'blogs/user/' + user_id, page: params.page };

    console.log('Blogs Users Next Page');

    return blogsController.getAjax(options);
  }
});
