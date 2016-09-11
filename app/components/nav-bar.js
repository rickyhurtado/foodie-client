import Ember from 'ember';
import AuthSessionMixin from '../mixins/auth-session';

const { service } = Ember.inject;

export default Ember.Component.extend(AuthSessionMixin, {
  tagName: '',
  session: service('session'),
  actions: {
    signOut: function(){
      this.get('session').invalidate();
    }
  }
});
