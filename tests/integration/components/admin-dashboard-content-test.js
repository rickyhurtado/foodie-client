import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('admin-dashboard-content', 'Integration | Component | admin dashboard content', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{admin-dashboard-content}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#admin-dashboard-content}}
      template block text
    {{/admin-dashboard-content}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
