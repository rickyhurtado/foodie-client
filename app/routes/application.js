import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  model: function(){
    let models = {};
    let activityStreamsController = this.controllerFor('activity-streams');

    models.activityStreams = activityStreamsController.get('model');

    return models;
  }
});
