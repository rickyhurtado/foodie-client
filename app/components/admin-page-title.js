import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['row'],
  actions: {
    goBack: function(){
      history.back();
    }
  }
});
