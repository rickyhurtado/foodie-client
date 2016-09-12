import Ember from 'ember';

export default Ember.Controller.extend({
  init: function(){
    console.log('Admin blogs index controller.');
  },
  formattedStatus: function(){
    return 'Formatted Status!';
  }
});
