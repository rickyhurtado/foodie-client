import Ember from 'ember';
import AlertMessageMixin from '../mixins/alert-message-mixin';
const { service } = Ember.inject;

export default Ember.Component.extend(AlertMessageMixin, {
  tagName: '',
  store: service('store'),
  router: service('-routing'),
  init: function(){
    this._super();

    if (this.get('user')){
      this.editUserFormProperties();
    }
  },
  role: 'Editor',
  activeAdmin: '',
  activeEditor: 'active',
  inputClassFirstName: 'form-control',
  inputClassLastName: 'form-control',
  inputClassEmail: 'form-control',
  inputClassPassword: 'form-control',
  buttonDisabled: false,
  backToUsers: function(){
    this.get('router').transitionTo('admin.users');
  },
  setRole: function(role){
    this.set('activeAdmin', '');
    this.set('activeEditor', '');
    this.set(`active${role}`, 'active');
    this.set('role', role);
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

    if (this.method === 'create' && this.get('password') === undefined){
      errors.push('Password is required.');
      this.set('inputClassPassword', 'form-control error');
    }

    if (errors.length > 0){
      message = this.setAlertErrorMessages(errors);
      this.setAlertMessage('danger', message);

      return false;
    }

    return true;
  },
  resetTextInputClass: function(self){
    self.set('inputClassFirstName', 'form-control');
    self.set('inputClassLastName', 'form-control');
    self.set('inputClassEmail', 'form-control');
  },
  saveUser: function(){
    let self = this;
    let method = self.method;
    let store = self.get('store');
    let firstName = self.get('firstName');
    let lastName = self.get('lastName');
    let email = self.get('email');
    let password = self.get('password');
    let role = self.get('role');
    let user;

    if (method === 'create'){
      user = store.createRecord('user', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        password: password,
        passwordConfirmation: password
      });

      user.save().then(function(){
        self.setAlertMessage('success', `${role} is successfully created.`);
        self.resetTextInputClass(self);

        Ember.run.later(function(){
          self.backToUsers();
        }, 2000);
      }, function(){
        self.set('buttonDisabled', false);
        self.formProcessAlertErrorMessage();
      });
    } else {
      user = store.findRecord('user', self.user.id).then(function(user){
        user.set('firstName', firstName);
        user.set('lastName', lastName);
        user.set('email', email);
        user.set('role', role);
        user.set('password', password);
        user.set('password_confirmation', password);

        user.save().then(function(){
          self.setAlertMessage('success', `${role} is successfully updated.`);
        self.resetTextInputClass(self);

          Ember.run.later(function(){
            self.backToUsers();
          }, 2000);
        }, function(){
          self.set('buttonDisabled', false);
          self.formProcessAlertErrorMessage();
        });
      });
    }
  },
  deleteUser: function(){
    let self = this;
    let store = self.get('store');

    store.findRecord('user', self.user.id, { backgroundReload: false }).then(function(user) {
      user.destroyRecord().then(function(){
        self.backToUsers();
      }, function(){
        self.set('buttonDisabled', false);
        self.formProcessAlertErrorMessage();
      });
    });
  },
  editUserFormProperties: function(){
    let user = this.get('user');

    this.setRole(user.get('role'));
    this.set('firstName', user.get('firstName'));
    this.set('lastName', user.get('lastName'));
    this.set('email', user.get('email'));
  },
  didInsertElement: function(){
    Ember.run.later(function(){
      window.scrollTo(0, 0);
    }, 100);
  },
  actions: {
    submitUserForm: function(){
      let result = this.validateUserForm();

      if (!result){
        return false;
      }

      this.setAlertMessage('warning', 'Saving user...');
      this.set('buttonDisabled', true);
      this.saveUser();
    },
    clickRole: function(role){
      this.setRole(role);
    },
    cancelUser: function(){
      let result = confirm('You have unsaved data. Do you want to proceed?');

      if (result){
        this.backToUsers();
      }
    },
    deleteUser: function(){
      let result = confirm('Are you sure you want to delete this user?');

      if (result){
        this.deleteUser();
      }
    }
  }
});
