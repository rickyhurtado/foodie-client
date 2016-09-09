import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  author: '',
  authorId: 0,
  activityAction: '',
  blogType: '',
  blogRoute: '',
  blogId: 0,
  createdAt: '',
  didReceiveAttrs: function(){
    let activity = this.activity;
    let category = activity.category_name.toLowerCase();

    this.set('author', activity.author);
    this.set('authorId', activity.author_id);
    this.set('blogType', category);
    this.set('blogRoute', category + 's.show');
    this.set('blogId', activity.blog_id);
    this.set('activityAction', activity.action);
    this.set('createdAt', activity.created_at);
  }
});
