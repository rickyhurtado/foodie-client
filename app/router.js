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
    this.route('user', { path: 'user/:user_id' }, function(){
      this.route('page', { path: 'page/:page' });
    });
  });
  this.route('page', { path: '/page/:page' });
  this.route('sign-in');
  this.route('admin');
  this.route('error', { path: '/*wildcard' });
});

export default Router;
