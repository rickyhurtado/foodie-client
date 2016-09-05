import Ember from 'ember';

export function truncateText(params, options){
  let length = 40;
  let string = Ember.$(params[0]).text();

  if (!Ember.isEmpty(options.length)){
    length = options.length;
  }

  if (!Ember.isEmpty(string)){
    if (string.length < length){
      return string;
    }

    return string.substring(0, length) + '...';
  }

  return '';
}

export default Ember.Helper.helper(truncateText);
