import Ember from 'ember';

export function unescapeHtml(params){
  let text = document.createElement('textarea');

  text.innerHTML = params[0];

  return text.value;
}

export default Ember.Helper.helper(unescapeHtml);
