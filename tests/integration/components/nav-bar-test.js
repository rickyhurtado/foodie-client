import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let authUser = false;
let role = 'Admin';
let sessionStub;

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true,
  beforeEach() {
    sessionStub = Ember.Service.extend({
      isAuthenticated: authUser,
      session: {
        content: {
          authenticated: {
            userId: 1,
            token: 'S4mpl3T0k3n',
            role: role,
            email: 'signed+user@example.com',
            firstName: 'Signed',
            lastName: 'User'
          }
        }
      }
    });

    this.register('service:session', sessionStub);
    this.inject.service('session', { as: 'session'});
  }
});

test('displays nav bar for guest user', function(assert) {
  // Set authUser for next test
  authUser = true;

  assert.expect(6);

  this.render(hbs`{{nav-bar}}`);

  assert.equal(this.$('.navbar-brand').text().trim(), 'Foodie | Ora HQ');
  assert.equal(this.$('#navbar a:eq(0)').text().trim(), 'Home');
  assert.equal(this.$('#navbar a:eq(1)').text().trim(), 'Posts');
  assert.equal(this.$('#navbar a:eq(2)').text().trim(), 'Recipes');
  assert.equal(this.$('#navbar a:eq(3)').text().trim(), 'Reviews');
  assert.equal(this.$('#navbar a:eq(4)').text().trim(), 'Sign In');
});

test('displays nav bar for signed user with "Admin" permission', function(assert) {
  // Set role for next test
  role = 'Editor';

  assert.expect(10);

  this.render(hbs`{{nav-bar}}`);

  assert.equal(this.$('.navbar-brand').text().trim(), 'Foodie | Ora HQ');
  assert.equal(this.$('#navbar a:eq(0)').text().trim(), 'Home');
  assert.equal(this.$('#navbar a:eq(1)').text().trim(), 'Posts');
  assert.equal(this.$('#navbar a:eq(2)').text().trim(), 'Recipes');
  assert.equal(this.$('#navbar a:eq(3)').text().trim(), 'Reviews');
  assert.equal(this.$('#navbar a:eq(4)').text().trim(), 'Signed User');
  assert.equal(this.$('#navbar .dropdown-menu a:eq(0)').text().trim(), 'Dashboard');
  assert.equal(this.$('#navbar .dropdown-menu a:eq(1)').text().trim(), 'Blogs');
  assert.equal(this.$('#navbar .dropdown-menu a:eq(2)').text().trim(), 'Users');
  assert.equal(this.$('#navbar .dropdown-menu a:eq(3)').text().trim(), 'Sign Out');
});

test('displays nav bar for signed user but no "Admin" permission', function(assert) {
  assert.expect(9);

  this.render(hbs`{{nav-bar}}`);

  assert.equal(this.$('.navbar-brand').text().trim(), 'Foodie | Ora HQ');
  assert.equal(this.$('#navbar a:eq(0)').text().trim(), 'Home');
  assert.equal(this.$('#navbar a:eq(1)').text().trim(), 'Posts');
  assert.equal(this.$('#navbar a:eq(2)').text().trim(), 'Recipes');
  assert.equal(this.$('#navbar a:eq(3)').text().trim(), 'Reviews');
  assert.equal(this.$('#navbar a:eq(4)').text().trim(), 'Signed User');
  assert.equal(this.$('#navbar .dropdown-menu a:eq(0)').text().trim(), 'Dashboard');
  assert.equal(this.$('#navbar .dropdown-menu a:eq(1)').text().trim(), 'Blogs');
  assert.equal(this.$('#navbar .dropdown-menu a:eq(2)').text().trim(), 'Sign Out');
});
