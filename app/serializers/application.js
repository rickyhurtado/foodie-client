import Ember from 'ember';
import JSONAPISerializer from 'ember-data/serializers/json-api';

const { underscore } = Ember.String;

export default JSONAPISerializer.extend({
  keyForAttribute: function(attr) {
    return underscore(attr);
  },
  keyForRelationship: function(rawKey) {
    return underscore(rawKey);
  }
});
