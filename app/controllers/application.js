import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  actions: {
    invalidateSession(){
      this.get('session').invalidate();
    },
    startActivityStreams(){
      console.log('Start activity streams...');
    }
  },
  init: function(){
    let eventSourceUrl = 'activity_streams';
    let initEventSource = true;
    let recentID = 0;
    let delay = 10000;
    let eventSource;

    function startActivityStreams(url){
      eventSource = new EventSource(url);
      eventSource.addEventListener('activity-stream', function(e){
        let jsonData = JSON.parse(e.data);

        // Render activity streams

        if (initEventSource){
          eventSource.close();
          initEventSource = false;
        }

        if (jsonData.length > 0){
          let newUrl = eventSourceUrl + '/' + jsonData[0].id;

          if (recentID !== jsonData[0].id){
            eventSource.close();
            recentID = jsonData[0].id;

            setTimeout(function(){ startActivityStreams(newUrl); }, delay);

            delay = 0;
          }
        }
      });
    }

    startActivityStreams(eventSourceUrl);
  }
});
