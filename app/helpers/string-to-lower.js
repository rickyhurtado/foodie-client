import Ember from 'ember';

export function stringToLower(string) {
  return string[0].toLowerCase();
}

export default Ember.Helper.helper(stringToLower);
