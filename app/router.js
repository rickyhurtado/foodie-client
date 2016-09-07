import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('posts', function(){
    this.route('index', { path: '/' });
    this.route('page', { path: 'page/:page' });
  });
  this.route('recipes', function() {
    this.route('index', { path: '/' });
    this.route('page', { path: 'page/:page' });
  });
  this.route('reviews');
  this.route('sign-in');
  this.route('admin');
  this.route('page', { path: '/page/:page' });
});

export default Router;
