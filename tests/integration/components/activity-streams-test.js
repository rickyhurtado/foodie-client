import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('activity-streams', 'Integration | Component | activity streams', {
  integration: true
});

const dateNow = new Date();
const timeNow = dateNow.getSeconds();
const firstCreatedAt = dateNow.setSeconds(timeNow - 30);
const firstActivity = {
  author_id: 1,
  author: 'Foodie Blogger',
  blog_id: 1,
  action: 'published',
  created_at: firstCreatedAt,
  category_name: 'Recipe',
  deleted: false
};
const secondCreatedAt = dateNow.setSeconds(timeNow - 7200);
const secondActivity = {
  author_id: 2,
  author: 'Foodie Reviewer',
  blog_id: 2,
  action: 'deleted',
  created_at: secondCreatedAt,
  category_name: 'Review',
  deleted: false
};
const model = [firstActivity, secondActivity];

test('it renders list of activity streams items', function(assert) {
  assert.expect(1);

  this.set('model', model);
  this.render(hbs`{{activity-streams activityStreams=model}}`);

  assert.equal(this.$('.activity-streams-list ul').text().trim(), 'Foodie Blogger\n' +
                                                                  'published a\n' +
                                                                  '  recipe\na few seconds ago.\n\n' +
                                                                  '          Foodie Reviewer\n' +
                                                                  'deleted a\n' +
                                                                  '  review\n2 hours ago.');
});
