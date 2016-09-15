import Ember from 'ember';
import AlertMessageMixin from '../mixins/alert-message-mixin';
const { service } = Ember.inject;

export default Ember.Component.extend(AlertMessageMixin, {
  tagName: '',
  activeAdmin: '',
  activeEditor: 'active',
  inputClassFirstName: 'form-control',
  inputClassLastName: 'form-control',
  inputClassEmail: 'form-control',
  inputClassPassword: 'form-control',
  buttonDisabled: false,
  router: service('-routing'),
  didInsertElement: function(){
    Ember.run.later(function(){
      window.scrollTo(0, 0);
    }, 100);
  },
  backToUsers: function(){
    this.get('router').transitionTo('admin.users');
  },
  validateUserForm: function(){
    let errors = [];
    let message = '';

    if (this.get('firstName') === undefined){
      errors.push('First name is required.');
      this.set('inputClassFirstName', 'form-control error');
    }

    if (this.get('lastName') === undefined){
      errors.push('Last name is required.');
      this.set('inputClassLastName', 'form-control error');
    }

    if (this.get('email') === undefined){
      errors.push('Email is required.');
      this.set('inputClassEmail', 'form-control error');
    }

    if (this.get('password') === undefined){
      errors.push('Password is required.');
      this.set('inputClassPassword', 'form-control error');
    }

    if (errors.length > 0){
      message = this.setErrorMessages(errors);
      this.setAlertMessage('danger', message);

      return false;
    }

    return true;
  },
  createUser: function(){
    return true;
  },
  actions: {
    submitNewUser: function(){
      let self = this;
      let result = self.validateUserForm();

      if (result === false){
        return false;
      }

      self.setAlertMessage('warning', 'Saving user...');
      self.set('buttonDisabled', true);

      result = self.createUser();

      if (result){
        self.setAlertMessage('success', 'New user is successfully created.');

        Ember.run.later(function(){
          self.backToUsers();
        }, 3000);
      }
    },
    clickRole: function(role){
      this.set('activeEditor', '');
      this.set('activeAdmin', '');
      this.set('active' + role, 'active');
      this.set('role', role);
    },
    cancelUser: function(){
      let result = confirm('You have unsaved data. Do you want to proceed?');

      if (result){
        self.backToUsers();
      }
    },
    deleteUser: function(){
      let result = confirm('Are you sure you want to delete this user?');

      if (result){
        history.back();
      }
    }
  }
});
