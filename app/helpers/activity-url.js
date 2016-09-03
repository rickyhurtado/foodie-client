import Ember from 'ember';

export function activityUrl(params) {
  return '/' + params[0].toLowerCase() + 's/' + params[1];
}

export default Ember.Helper.helper(activityUrl);
