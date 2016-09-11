import Ember from 'ember';

export function formattedDate(params, options) {
  return moment(params[0]).format(options.format);
}

export default Ember.Helper.helper(formattedDate);
