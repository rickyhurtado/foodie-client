import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),
  actions: {
    authenticate: function() {
      let { email, password } = this.getProperties('email', 'password');

      return this.get('session').authenticate('authenticator:devise', email, password).catch(() => {
        this.set('errorMessage', 'Invalid email or password.');
      });
    }
  }
});
