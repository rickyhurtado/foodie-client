import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('user', {
  default: {
    email: 'admin+user@example.com',
    firstName: 'Super',
    lastName: 'Admin',
    role: 'Admin'
  },
  firstBlogger: {
    email: 'blog+user+1@example.com',
    firstName: 'First',
    lastName: 'Blogger',
    role: 'Editor'
  },
  secondBlogger: {
    email: 'blog+user+2@example.com',
    firstName: 'Second',
    lastName: 'Blogger',
    role: 'Editor'
  }
});
