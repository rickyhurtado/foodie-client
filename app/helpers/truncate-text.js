import Ember from 'ember';

export function truncateText(params, options){
  let length = 40;
  let stringObject = document.createElement('textarea');

  stringObject.innerHTML = params[0];

  let string = stringObject.textContent || stringObject.innerText || '';
  let strippedHtmlString = Ember.$(string).text();


  if (!Ember.isEmpty(options.length)){
    length = options.length;
  }

  if (!Ember.isEmpty(strippedHtmlString)){
    if (strippedHtmlString.length < length){
      return strippedHtmlString;
    }

    return strippedHtmlString.substring(0, length).trim() + '...';
  }

  return '';
}

export default Ember.Helper.helper(truncateText);
