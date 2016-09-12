import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  showPagination: false,
  showHomeLink: false,
  showPrevLink: false,
  showNextLink: false,
  prevPage: 0,
  nextPage: 0,
  didReceiveAttrs: function(){
    let links = this.links;
    let showPrev = links.prev ? true : false;
    let showNext = links.next ? true : false;

    this.set('showHomeLink', false);

    if (!this.queryParams && showPrev && this.getPage(links.prev) === '1'){
      this.set('showHomeLink', true);
      showPrev = false;
    }

    this.setShowLink('showPrevLink', showPrev, 'prevPage', links.prev);
    this.setShowLink('showNextLink', showNext, 'nextPage', links.next);
    this.set('showPagination', this.get('showHomeLink') || showPrev || showNext);

    window.scrollTo(0, 0);
  },
  getPage: function(link){
    let urlObject = JSON.parse('{"' + decodeURI(link).replace(/"/g, '\\"').replace(/&/g,'","').replace(/=/g,'":"') + '"}');

    return urlObject['page[number]'];
  },
  setShowLink: function(showLink, state, page, uri){
    this.set(showLink, state);

    if (state){
      this.set(page, this.getPage(uri));
    }
  }
});
