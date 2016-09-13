import Ember from 'ember';
import AlertMessageMixin from '../mixins/alert-message-mixin';
const { service } = Ember.inject;

export default Ember.Component.extend(AlertMessageMixin, {
  tagName: '',
  type: 'Post',
  status: 'published',
  activePost: 'active',
  activeRecipe: '',
  activeReview: '',
  activePublished: 'active',
  activeDraft: '',
  inputClassTitle: 'form-control',
  inputClassBody: 'form-control',
  inputClassDate: 'form-control',
  buttonDisabled: false,
  router: service('-routing'),
  didInsertElement: function(){
    Ember.run.later(function(){
      window.scrollTo(0, 0);
    }, 100);
  },
  backToBlogs: function(){
    this.get('router').transitionTo('admin.blogs');
  },
  validateBlogForm: function(){
    let errors = [];
    let message = '';

    if (this.get('blogTitle') === undefined){
      errors.push('Title is required.');
      this.set('inputClassTitle', 'form-control error');
    }

    if (this.get('blogBody') === undefined){
      errors.push('Body is required.');
      this.set('inputClassBody', 'form-control error');
    }

    if (this.get('blogPublishedAt') === undefined){
      errors.push('Published date is required.');
      this.set('inputClassDate', 'form-control error');
    }

    if (errors.length > 0){
      message = '<ul><li>' + errors.join('</li><li>') + '</li>';
      this.setAlertMessage('danger', message);
      return false;
    }

    return true;
  },
  createBlog: function(){
    return true;
  },
  actions: {
    submitNewBlog: function(){
      let self = this;
      let result = self.validateBlogForm();

      if (result === false){
        return false;
      }

      self.setAlertMessage('warning', 'Saving blog...');
      self.set('buttonDisabled', true);

      result = self.createBlog();

      if (result){
        self.setAlertMessage('success', 'New blog is successfully created.');
        self.set('inputClassTitle', 'form-control');
        self.set('inputClassBody', 'form-control');
        self.set('inputClassDate', 'form-control');

        Ember.run.later(function(){
          self.backToBlogs();
        }, 3000);
      }
    },
    clickType: function(type){
      this.set('activePost', '');
      this.set('activeRecipe', '');
      this.set('activeReview', '');
      this.set('active' + type, 'active');
      this.set('type', type);
    },
    clickStatus: function(status){
      this.set('activePublished', '');
      this.set('activeDraft', '');
      this.set('active' + status, 'active');
      this.set('status', status);
    },
    cancelBlog: function(){
      let result = confirm('You have unsaved data. Do you want to proceed?');

      if (result){
        this.backToBlogs();
      }
    },
    deleteBlog: function(){
      let result = confirm('Are you sure you want to delete this blog?');

      if (result){
        history.back();
      }
    }
  }
});
