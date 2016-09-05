import Ember from 'ember';

export function blogsIncluded(params, options) {
  let attributeValue = params[0].filterBy('type', options.type).findBy('id', options.id).attributes[options.attribute];

  if (!Ember.isEmpty(options.lowerCase) && options.lowerCase){
    attributeValue = attributeValue.toLowerCase();
  }

  return attributeValue;
}

export default Ember.Helper.helper(blogsIncluded);
