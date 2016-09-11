import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  tagName: '',
  router: service('-routing'),
  buttonDisabled: false,
  backToUsers: function(){
    this.get('router').transitionTo('admin.users');
  },
  saveUserForm: function(){
    return true;
  },
  actions: {
    saveUser: function(){
      let result = this.saveUserForm();

      this.set('buttonDisabled', true);

      if (result){
        this.backToUsers();
      }
    },
    deleteUser: function(){
      this.backToUsers();
    }
  }
});
