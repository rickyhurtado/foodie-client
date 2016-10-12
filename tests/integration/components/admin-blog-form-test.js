import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { make, manualSetup } from 'ember-data-factory-guy';

const sessionStub = Ember.Service.extend({
  session: {
    content: {
      authenticated: {
        userId: 1,
        token: 'S4mpl3T0k3n',
        role: 'Admin',
        email: 'admin+user@example.com',
        firstName: 'Admin',
        lastName: 'User'
      }
    }
  }
});
let origConfirm;
let transitionToAdminBlogs = '';
const routeStub = Ember.Service.extend({
  transitionTo() {
    transitionToAdminBlogs = 'admin.blogs';
  }
});

moduleForComponent('admin-blog-form', 'Integration | Component | admin blog form', {
  integration: true,
  beforeEach() {
    this.register('service:session', sessionStub);
    this.inject.service('session', { as: 'session'});
    this.register('service:-routing', routeStub);
    origConfirm = window.confirm;
    manualSetup(this.container);
  },
  afterEach() {
    window.confirm = origConfirm;
    transitionToAdminBlogs = '';
  }
});

test('display the "Cancel" button', function(assert) {
  assert.expect(1);

  this.render(hbs`{{admin-blog-form showCancelButton=true}}`);

  assert.equal(this.$('.btn-danger').text(), 'Cancel');
});

test('display the "Delete" button', function(assert) {
  assert.expect(1);

  this.render(hbs`{{admin-blog-form showDeleteButton=true}}`);

  assert.equal(this.$('.btn-danger').text(), 'Delete');
});

test('display the "window.confirm" dialog box when "Cancel" or "Delete" button is clicked', function(assert) {
  assert.expect(2);

  let displayConfirm = false;

  // Stub the window.confirm()
  window.confirm = function() {
    displayConfirm = true;
  };

  this.render(hbs`{{admin-blog-form showCancelButton=true}}`);
  this.$('.btn-danger').click();

  assert.equal(displayConfirm, true);
  displayConfirm = false;

  this.render(hbs`{{admin-blog-form showDeleteButton=true}}`);
  this.$('.btn-danger').click();

  assert.equal(displayConfirm, true);
});

test('do nothing when "Cancel" or "Delete" button is clicked and "window.confirm" dialog box returns false', function(assert) {
  assert.expect(3);

  // Stub the window.confirm()
  window.confirm = function() {
    return false;
  };

  assert.equal(transitionToAdminBlogs, '');

  this.render(hbs`{{admin-blog-form showCancelButton=true}}`);
  this.$('.btn-danger').click();

  assert.equal(transitionToAdminBlogs, '');

  this.render(hbs`{{admin-blog-form showDeleteButton=true}}`);
  this.$('.btn-danger').click();

  assert.equal(transitionToAdminBlogs, '');
});

test('display the Blogs page when "Cancel" button is clicked and "window.confirm" dialog box returns true', function(assert) {
  assert.expect(2);

  // Stub the window.confirm()
  window.confirm = function() {
    return true;
  };

  assert.equal(transitionToAdminBlogs, '');

  this.render(hbs`{{admin-blog-form showCancelButton=true}}`);
  this.$('.btn-danger').click();

  assert.equal(transitionToAdminBlogs, 'admin.blogs');
});

test('init "New Blog" form with default button states and text inputs', function(assert) {
  assert.expect(5);

  this.render(hbs`{{admin-blog-form showDeleteButton=true}}`);

  assert.equal(this.$('.btn.active:eq(0)').text(), 'Post');
  assert.equal(this.$('#blog-title').val(), '');
  assert.equal(this.$('#blog-body').val(), '');
  assert.equal(this.$('#blog-published-date').val(), '');
  assert.equal(this.$('.btn.active:eq(1)').text(), 'Published');
});

test('set the blog type when "Type" button is clicked ', function(assert) {
  assert.expect(4);

  this.render(hbs`{{admin-blog-form}}`);
  assert.equal(this.$('.btn.active:eq(0)').text(), 'Post');

  this.$('.btn:eq(1)').click();
  assert.equal(this.$('.btn.active:eq(0)').text(), 'Recipe');

  this.$('.btn:eq(2)').click();
  assert.equal(this.$('.btn.active:eq(0)').text(), 'Review');

  this.$('.btn:eq(0)').click();
  assert.equal(this.$('.btn.active:eq(0)').text(), 'Post');
});

test('set blog status when "Status" button is clicked', function(assert) {
  assert.expect(3);

  this.render(hbs`{{admin-blog-form}}`);
  assert.equal(this.$('.btn.active:eq(1)').text(), 'Published');

  this.$('.btn:eq(4)').click();
  assert.equal(this.$('.btn.active:eq(1)').text(), 'Draft');

  this.$('.btn:eq(3)').click();
  assert.equal(this.$('.btn.active:eq(1)').text(), 'Published');
});

test('display errors when "New Blog" form is submitted with empty input text fields', function(assert) {
  assert.expect(8);

  this.render(hbs`{{admin-blog-form method='create'}}`);

  assert.equal(this.$('.alert').length, 0);
  assert.equal(this.$('#blog-title').hasClass('error'), false);
  assert.equal(this.$('#blog-body').hasClass('error'), false);
  assert.equal(this.$('#blog-published-date').hasClass('error'), false);

  this.$('[type=submit]').click();

  assert.equal(this.$('.alert').text(), 'Title is required.Body is required.Published date is required.');
  assert.equal(this.$('#blog-title').hasClass('error'), true);
  assert.equal(this.$('#blog-body').hasClass('error'), true);
  assert.equal(this.$('#blog-published-date').hasClass('error'), true);
});

test('set "Edit Blog" form with the existing blog data', function(assert) {
  assert.expect(5);

  let recipe = make('categoryRecipe');
  let model = make('blogRecipe', { categoryId: recipe.get('id') });

  this.set('model', model);
  this.render(hbs`{{admin-blog-form blog=model}}`);

  assert.equal(this.$('.btn.active:eq(0)').text(), 'Recipe');
  assert.equal(this.$('#blog-title').val(), 'Recipe Title');
  assert.equal(this.$('#blog-body').val(), '<p>Blog recipe body content.</p>');
  assert.equal(this.$('#blog-published-date').val(), '2016-05-07');
  assert.equal(this.$('.btn.active:eq(1)').text(), 'Draft');
});

test('submit blog form when "Save" button is clicked', function(assert) {
  assert.expect(1);

  this.on('stubSubmitBlogForm', function() {
    // This does not triggger the stubbed form action
    console.log('Stubbed submit blog form is triggered.');
  });

  this.render(hbs`{{admin-blog-form submitBlogForm=stubSubmitBlogForm}}`);

  assert.equal(this.$('.btn.btn-success').length, 1);

  this.$('.btn.btn-success').click();
});

test('should delete an existing blog when "Delete" button is clicked', function(assert) {
  assert.expect(2);

  let recipe = make('category');
  let model = make('blog', { categoryId: recipe.get('id') });
  let blogShouldBeDeleted = false;

  // Stub the window.confirm()
  window.confirm = function() {
    blogShouldBeDeleted = true;
  };

  this.set('model', model);
  this.render(hbs`{{admin-blog-form blog=model showDeleteButton=true}}`);

  assert.equal(this.$('#blog-title').val(), 'Post Title');

  this.$('.btn.btn-danger').click();

  assert.equal(blogShouldBeDeleted, true);
});
