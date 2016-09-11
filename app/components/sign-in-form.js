import Ember from 'ember';
import AuthSessionMixin from '../mixins/auth-session-mixin';

export default Ember.Component.extend(AuthSessionMixin, {
  actions: {
    authenticate: function() {
      let { email, password } = this.getProperties('email', 'password');

      return this.get('session').authenticate('authenticator:devise', email, password).catch(() => {
        this.set('errorMessage', 'Invalid email or password.');
      });
    }
  }
});
