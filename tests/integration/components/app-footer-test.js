import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-footer', 'Integration | Component | app footer', {
  integration: true
});

test('displays footer', function(assert) {
  assert.expect(1);

  this.render(hbs`{{app-footer}}`);

  assert.equal(this.$().text().trim(), 'Foodie | Ora HQ © 2016');
});
