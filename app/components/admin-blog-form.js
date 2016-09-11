import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  tagName: '',
  router: service('-routing'),
  buttonDisabled: false,
  backToBlogs: function(){
    this.get('router').transitionTo('admin.blogs');
  },
  saveBlogForm: function(){
    return true;
  },
  actions: {
    saveBlog: function(){
      let result = this.saveBlogForm();

      this.set('buttonDisabled', true);

      if (result){
        this.backToBlogs();
      }
    },
    deleteBlog: function(){
      this.backToBlogs();
    }
  }
});
