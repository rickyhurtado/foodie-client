import Ember from 'ember';
import AuthSessionMixin from '../mixins/auth-session-mixin';

export default Ember.Component.extend(AuthSessionMixin, {
  tagName: '',
  actions: {
    signOut: function(){
      this.get('session').invalidate();
    }
  }
});
