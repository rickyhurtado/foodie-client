import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('activity-streams-item', 'Integration | Component | activity streams item', {
  integration: true
});

const dateNow = new Date();
const timeNow = dateNow.getSeconds();
const createdAt = dateNow.setSeconds(timeNow - 30);
const activity = {
  author_id: 1,
  author: 'Foodie Blogger',
  blog_id: 1,
  action: 'published',
  created_at: createdAt,
  category_name: 'Recipe',
  deleted: false
};

test('it renders an activity streams item', function(assert) {
  assert.expect(8);

  this.set('activity', activity);
  this.render(hbs`{{activity-streams-item activity=activity}}`);

  assert.equal(this.$('li').text().trim(), 'Foodie Blogger\n' +
                                           'published a\n' +
                                           '  recipe\n' +
                                           'a few seconds ago.');
  assert.equal(this.$('li a:eq(0)').text(), 'Foodie Blogger');
  assert.equal(this.$('li a:eq(1)').text(), 'recipe');
  assert.equal(this.$('li time').text(), 'a few seconds ago');

  activity.action = 'deleted';
  activity.deleted = true;

  this.set('activity', activity);
  this.render(hbs`{{activity-streams-item activity=activity}}`);

  assert.equal(this.$('li').text().trim(), 'Foodie Blogger\n' +
                                           'deleted a\n' +
                                           '  recipe\n' +
                                           'a few seconds ago.');
  assert.equal(this.$('li a:eq(0)').text(), 'Foodie Blogger');
  assert.equal(this.$('li strong').text(), 'recipe');
  assert.equal(this.$('li time').text(), 'a few seconds ago');
});
