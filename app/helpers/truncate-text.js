import Ember from 'ember';

export function truncateText(params, options){
  let length = 40;
  let tmp = document.createElement('div');

  tmp.innerHTML = params[0];

  let string = tmp.textContent || tmp.innerText || '';

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
