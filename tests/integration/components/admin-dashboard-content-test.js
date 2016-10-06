import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let role = 'Admin';
let sessionStub;

moduleForComponent('admin-dashboard-content', 'Integration | Component | admin dashboard content', {
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
  }
});

test('displays the dashboard content for admin user', function(assert) {
  // Set role for next test
  role = 'Editor';

  assert.expect(6);

  this.render(hbs`{{admin-dashboard-content}}`);

  assert.equal(this.$('strong:eq(0)').text().trim(), 'Manage Users');
  assert.equal(this.$('a:eq(0)').text().trim(), 'View Users');
  assert.equal(this.$('a:eq(1)').text().trim(), 'New User');

  assert.equal(this.$('strong:eq(1)').text().trim(), 'Manage Blogs');
  assert.equal(this.$('a:eq(2)').text().trim(), 'View Blogs');
  assert.equal(this.$('a:eq(3)').text().trim(), 'New Blog');
});

test('displays the dashboard content for editor', function(assert) {
  assert.expect(3);

  this.render(hbs`{{admin-dashboard-content}}`);

  assert.equal(this.$('strong:eq(0)').text().trim(), 'Manage Blogs');
  assert.equal(this.$('a:eq(0)').text().trim(), 'View Blogs');
  assert.equal(this.$('a:eq(1)').text().trim(), 'New Blog');
});
