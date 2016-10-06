import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('admin-page-title', 'Integration | Component | admin page title', {
  integration: true
});

test('displays an admin page header with "New" and "Back" buttons', function(assert) {
  assert.expect(3);

  this.render(hbs`{{admin-page-title title='Edit Blog' newButtonTitle='New Blog' newButton=true backButton=true}}`);

  assert.equal(this.$().text().trim(), "Edit Blog\n      Back\n      New Blog");
  assert.equal(this.$('a').text().trim(), 'New Blog');
  assert.equal(this.$('button').text().trim(), 'Back');
});

test('displays an admin page header with "New" button and without "Back" button', function(assert) {
  assert.expect(3);

  this.render(hbs`{{admin-page-title title='Blogs' newButtonTitle='New Blog' newButton=true}}`);

  assert.equal(this.$().text().trim(), "Blogs\n      New Blog");
  assert.equal(this.$('a').text().trim(), 'New Blog');
  assert.equal(this.$('button').text().trim(), '');
});

test('displays an admin page header without the "New" and "Back" buttons', function(assert) {
  assert.expect(3);

  this.render(hbs`{{admin-page-title title='Blogs'}}`);

  assert.equal(this.$().text().trim(), 'Blogs');
  assert.equal(this.$('a').text().trim(), '');
  assert.equal(this.$('button').text().trim(), '');
});
