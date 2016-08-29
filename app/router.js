import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('blog');
  this.route('recipes');
  this.route('reviews');
  this.route('sign-in');
  this.route('admin');
});

export default Router;
