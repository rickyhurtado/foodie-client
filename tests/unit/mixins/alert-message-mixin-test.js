import Ember from 'ember';
import AlertMessageMixinMixin from 'foodie-client/mixins/alert-message-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | alert message mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let AlertMessageMixinObject = Ember.Object.extend(AlertMessageMixinMixin);
  let subject = AlertMessageMixinObject.create();
  assert.ok(subject);
});
