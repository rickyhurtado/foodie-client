import Ember from 'ember';

let currentPage = null;

export default Ember.Route.extend({
  activate: function() {
    document.title = 'Blogs by User | Foodie | Ora HQ';
  },
  initialized: false,
  model: function(params){
    currentPage = window.location.pathname.split('/')[5];

    let blogsController = this.controllerFor('blogs');
    let options = { route: 'blogs/user/' + params.user_id, page: currentPage };

    return blogsController.getAjax(options);
  },
  actions: {
    didTransition: function(){
      let self = this;

      if (self.get('initialized')){
        setTimeout(function(){
          let page = window.location.pathname.split('/')[5];

          if (currentPage !== page){
            currentPage = page;
            self.refresh();
          }
        }, 50);
      }

      self.set('initialized', true);
    }
  }
});
