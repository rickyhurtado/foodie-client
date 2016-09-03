import Ember from 'ember';

export function momentDate(date, options) {
  return window.moment(date[0]).startOf(options.startOf).fromNow();
}

export default Ember.Helper.helper(momentDate);
