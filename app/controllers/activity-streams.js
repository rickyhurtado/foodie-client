import Ember from 'ember';

export default Ember.Controller.extend({
  model: [],
  init: function(){
    let eventSourceUrl = '/activity_streams';
    let initEventSource = true;
    let recentID = 0;
    let delay = 10000;
    let eventSource;

    function startActivityStreams(url, self){
      eventSource = new EventSource(url);
      eventSource.addEventListener('activity-stream', function(e){
        let jsonData = JSON.parse(e.data);

        if (initEventSource){
          eventSource.close();
          initEventSource = false;
        }

        if (jsonData.length > 0){
          if (recentID !== jsonData[0].id){
            eventSource.close();
            recentID = jsonData[0].id;

            let newUrl = eventSourceUrl + '/' + recentID;

            setTimeout(function(){ startActivityStreams(newUrl, self); }, delay);

            delay = 0;
          }
        }

        jsonData.reverse().forEach(function(item){
          self.get('model').unshiftObject(item);
        });
      });
    }

    startActivityStreams(eventSourceUrl, this);
  }
});
