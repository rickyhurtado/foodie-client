import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  tagName: '',
  session: service('session'),
  actions: {
    signOut() {
      this.get('session').invalidate();
    }
  }
});
