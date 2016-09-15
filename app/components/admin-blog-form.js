import Ember from 'ember';
import AuthSessionMixin from '../mixins/auth-session-mixin';
import AlertMessageMixin from '../mixins/alert-message-mixin';
const { service } = Ember.inject;

export default Ember.Component.extend(AuthSessionMixin, AlertMessageMixin, {
  tagName: '',
  store: service('store'),
  router: service('-routing'),
  init: function(){
    this._super();

    if (this.get('blog')){
      this.editBlogFormProperties();
    }
  },
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
  backToBlogs: function(){
    this.get('router').transitionTo('admin.blogs');
  },
  getCategoryId: function(type){
    let categories = ['Post', 'Recipe', 'Review'];

    return categories.indexOf(type) + 1;
  },
  setType: function(type){
    this.set('activePost', '');
    this.set('activeRecipe', '');
    this.set('activeReview', '');
    this.set(`active${type}`, 'active');
    this.set('type', type);
  },
  setStatus: function(status){
    this.set('activePublished', '');
    this.set('activeDraft', '');
    this.set(`active${status}`, 'active');
    this.set('status', status.toLowerCase());
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
      message = this.setAlertErrorMessages(errors);
      this.setAlertMessage('danger', message);

      return false;
    }

    return true;
  },
  saveBlog: function(){
    let self = this;
    let method = self.method;
    let userId = self.get('currentUser.id');
    let categoryId = self.getCategoryId(self.get('type'));
    let store = self.get('store');
    let title = self.get('blogTitle');
    let body = self.get('blogBody');
    let status = self.get('status');
    let date = new Date(`${self.get('blogPublishedAt')} 00:00:00`);
    let blogCategory = store.peekRecord('category', categoryId);
    let blogUser = store.peekRecord('user', userId);
    let blog;

    if (method === 'create'){
      blog = store.createRecord('blog', {
        title: title,
        body: body,
        publishedAt: date,
        status: status,
        user: blogUser,
        category: blogCategory
      });

      blog.save().then(function(){
        self.setAlertMessage('success', `${blogCategory.get('name')} is successfully created.`);
        self.set('inputClassTitle', 'form-control');
        self.set('inputClassBody', 'form-control');
        self.set('inputClassDate', 'form-control');

        Ember.run.later(function(){
          self.backToBlogs();
        }, 2000);
      }, function(){
        self.set('buttonDisabled', false);
        self.formProcessAlertErrorMessage();
      });
    } else {
      blog = store.findRecord('blog', self.blog.id).then(function(blog){
        blog.set('title', title);
        blog.set('body', body);
        blog.set('publishedAt', date);
        blog.set('status', status);
        blog.set('user', blogUser);
        blog.set('category', blogCategory);

        blog.save().then(function(){
          self.setAlertMessage('success', `${blogCategory.get('name')} is successfully updated.`);
          self.set('inputClassTitle', 'form-control');
          self.set('inputClassBody', 'form-control');
          self.set('inputClassDate', 'form-control');

          Ember.run.later(function(){
            self.backToBlogs();
          }, 2000);
        }, function(){
          self.set('buttonDisabled', false);
          self.formProcessAlertErrorMessage();
        });
      });
    }
  },
  deleteBlog: function(){
    let self = this;
    let store = self.get('store');

    store.findRecord('blog', self.blog.id, { backgroundReload: false }).then(function(blog) {
      blog.destroyRecord().then(function(){
        self.backToBlogs();
      }, function(){
        self.set('buttonDisabled', false);
        self.formProcessAlertErrorMessage();
      });
    });
  },
  editBlogFormProperties: function(){
    let store = this.get('store');
    let blog = this.get('blog');
    let category = store.peekRecord('category', blog.get('categoryId'));
    let type = category.get('name');
    let date = new Date(blog.get('publishedAt'));
    let year = date.getFullYear();
    let month = `${date.getMonth().toString().length === 1 ? '0' : ''}${date.getMonth() + 1}`;
    let day = `${date.getDate().toString().length === 1 ? '0' : ''}${date.getDate()}`;

    this.setType(type);
    this.setStatus(blog.get('formattedStatus'));
    this.set('blogTitle', blog.get('title'));
    this.set('blogBody', blog.get('body'));
    this.set('blogPublishedAt', `${year}-${month}-${day}`);
  },
  didInsertElement: function(){
    Ember.run.later(function(){
      window.scrollTo(0, 0);
    }, 100);
  },
  actions: {
    submitBlogForm: function(){
      let result = this.validateBlogForm();

      if (!result){
        return false;
      }

      this.setAlertMessage('warning', 'Saving blog...');
      this.set('buttonDisabled', true);
      this.saveBlog();
    },
    clickType: function(type){
      this.setType(type);
    },
    clickStatus: function(status){
      this.setStatus(status);
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
        this.deleteBlog();
      }
    }
  }
});
