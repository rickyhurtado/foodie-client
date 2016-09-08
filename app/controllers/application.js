import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  actions: {
    invalidateSession(){
      this.get('session').invalidate();
    }
  },
  currentPathChanged: function(){
    window.scrollTo(0, 0);
  }.observes('currentPath')
});
