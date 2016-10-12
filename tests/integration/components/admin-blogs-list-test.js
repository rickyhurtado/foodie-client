import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { make, manualSetup } from 'ember-data-factory-guy';

let role = 'Admin';
let sessionStub;

moduleForComponent('admin-blogs-list', 'Integration | Component | admin blogs list', {
  integration: true,
  beforeEach() {
    sessionStub = Ember.Service.extend({
      session: {
        content: {
          authenticated: {
            userId: 1,
            token: 'S4mpl3T0k3n',
            role: role,
            email: 'admin+user@example.com',
            firstName: 'Admin',
            lastName: 'User'
          }
        }
      }
    });

    this.register('service:session', sessionStub);
    this.inject.service('session', { as: 'session'});
    manualSetup(this.container);
  }
});

test('display message when no blogs is found', function(assert) {
  assert.expect(1);

  this.render(hbs`{{admin-blogs-list}}`);

  assert.equal(this.$().text().trim(), 'There are no blogs found. Create a new blog instead.');
});

test('display list of blogs when user is an Admin', function(assert) {
  // Set role for next test
  role = 'Editor';

  assert.expect(10);

  let firstBlogger = make('firstBlogger');
  let post = make('category');
  let postBlog = make('blog', { user: firstBlogger, category: post });

  let secondBlogger = make('secondBlogger');
  let recipe  = make('categoryRecipe');
  let recipeBlog = make('blogRecipe', { user: secondBlogger, category: recipe });

  this.set('model', [postBlog, recipeBlog]);

  this.render(hbs`{{admin-blogs-list blogs=model}}`);

  assert.equal(this.$('tr:eq(0) td').text().trim(), 'Title Post Title');
  assert.equal(this.$('tr:eq(1) td').text().trim(), 'Author First Blogger');
  assert.equal(this.$('tr:eq(2) td').text().trim(), 'Published September 1, 2015');
  assert.equal(this.$('tr:eq(3) td:eq(0)').text().trim(), 'Type Post');
  assert.equal(this.$('tr:eq(3) td:eq(1)').text().trim(), 'Status Published');

  assert.equal(this.$('tr:eq(4) td').text().trim(), 'Title Recipe Title');
  assert.equal(this.$('tr:eq(5) td').text().trim(), 'Author Second Blogger');
  assert.equal(this.$('tr:eq(6) td').text().trim(), 'Published May 7, 2016');
  assert.equal(this.$('tr:eq(7) td:eq(0)').text().trim(), 'Type Recipe');
  assert.equal(this.$('tr:eq(7) td:eq(1)').text().trim(), 'Status Draft');
});

test('display list of blogs when user is an Editor', function(assert) {
  assert.expect(8);

  let post = make('category');
  let postBlog = make('blog', { category: post });

  let recipe  = make('categoryRecipe');
  let recipeBlog = make('blogRecipe', { category: recipe });

  this.set('model', [postBlog, recipeBlog]);

  this.render(hbs`{{admin-blogs-list blogs=model}}`);

  assert.equal(this.$('tr:eq(0) td').text().trim(), 'Title Post Title');
  assert.equal(this.$('tr:eq(1) td').text().trim(), 'Published September 1, 2015');
  assert.equal(this.$('tr:eq(2) td:eq(0)').text().trim(), 'Type Post');
  assert.equal(this.$('tr:eq(2) td:eq(1)').text().trim(), 'Status Published');

  assert.equal(this.$('tr:eq(3) td').text().trim(), 'Title Recipe Title');
  assert.equal(this.$('tr:eq(4) td').text().trim(), 'Published May 7, 2016');
  assert.equal(this.$('tr:eq(5) td:eq(0)').text().trim(), 'Type Recipe');
  assert.equal(this.$('tr:eq(5) td:eq(1)').text().trim(), 'Status Draft');
});
