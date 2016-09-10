import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  author: '',
  authorPath: '',
  authorId: 0,
  blogsUserRoute: 'blogs.users.user',
  activityAction: '',
  blogType: '',
  blogRoute: '',
  blogId: 0,
  createdAt: '',
  deleted: 0,
  didReceiveAttrs: function(){
    let activity = this.activity;
    let authorId = activity.author_id;
    let authorPath = 'blogs/user/' + activity.author_id;
    let category = activity.category_name.toLowerCase();

    this.set('author', activity.author);
    this.set('authorPath', authorPath);
    this.set('authorId', authorId);
    this.set('blogType', category);
    this.set('blogRoute', category + 's.show');
    this.set('blogId', activity.blog_id);
    this.set('activityAction', activity.action);
    this.set('createdAt', activity.created_at);
    this.set('deleted', activity.deleted);
  }
});
