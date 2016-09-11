import Ember from 'ember';
import AuthSessionMixin from 'foodie-client/mixins/auth-session-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | auth session');

// Replace this with your real tests.
test('it works', function(assert) {
  let AuthSessionObject = Ember.Object.extend(AuthSessionMixin);
  let subject = AuthSessionObject.create();
  assert.ok(subject);
});
