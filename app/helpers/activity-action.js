import Ember from 'ember';

export function activityAction(action) {
  return action + 'd';
}

export default Ember.Helper.helper(activityAction);
