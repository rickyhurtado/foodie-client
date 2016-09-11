import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('posts', function(){
    this.route('index', { path: '/' });
    this.route('show', { path: '/:blog_id' });
    this.route('page', { path: 'page/:page' });
  });
  this.route('recipes', function(){
    this.route('index', { path: '/' });
    this.route('show', { path: '/:blog_id' });
    this.route('page', { path: 'page/:page' });
  });
  this.route('reviews', function(){
    this.route('index', { path: '/' });
    this.route('show', { path: '/:blog_id' });
    this.route('page', { path: 'page/:page' });
  });
  this.route('blogs', function(){
    this.route('users', { path: '/user' }, function(){
      this.route('user', { path: '/user/:user_id/page/:page' });
      this.route('user', { path: '/:user_id' }, function(){
        this.route('pages', { path: '/page' }, function(){
          this.route('page', { path: '/:page' });
        });
      });
    });
  });
  this.route('admin', function() {
    this.route('blogs', { path: '/blogs' }, function(){
      this.route('index', { path: '/' });
      this.route('new', { path: '/new' });
      this.route('edit', { path: '/:id/edit' });
    });
    this.route('users', { path: '/users' }, function(){
      this.route('index', { path: '/' });
      this.route('new', { path: '/new' });
      this.route('edit', { path: '/:id/edit' });
    });
  });
  this.route('page', { path: '/page/:page' });
  this.route('sign-in');
  this.route('error', { path: '/*wildcard' });
});

export default Router;
