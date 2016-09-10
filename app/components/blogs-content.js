import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  title: '',
  blog: {},
  blogsByUser: false,
  didReceiveAttrs: function(){
    let blogs = this.blogs.data;

    if (blogs.length > 0 && this.blogsByUserTitle){
      this.set('blog', blogs[0]);

      let authorId = this.getRel({ type: 'user', attribute: 'id' });
      let author = this.blogIncluded({ id: authorId, type: 'users', attribute: 'full-name'});

      this.set('blogsByUser', true);
      this.set('title', this.blogsByUserTitle + ' ' + author);
    }
  },
  getRel: function(options){
    return this.blog.relationships[options.type].data[options.attribute];
  },
  blogIncluded: function(options) {
    let included = this.blogs.included;
    let attributeValue = included.filterBy('type', options.type).findBy('id', options.id).attributes[options.attribute];

    if (!Ember.isEmpty(options.lowerCase) && options.lowerCase){
      attributeValue = attributeValue.toLowerCase();
    }

    return attributeValue;
  },
  didInsertElement: function(){
    if (this.get('blogsByUser')){
      document.title = this.get('title') + ' | Foodie | Ora HQ';
    }
  }
});
