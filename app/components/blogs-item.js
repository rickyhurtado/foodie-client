import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['blog-item', 'col-md-12'],
  blogTitle: '',
  blogBody: '',
  publishedAt: '',
  blogRoute: '',
  blogId: 0,
  author: '',
  authorId: 0,
  blogsUserRoute: 'blogs.users.user',
  category: '',
  categoryRoute: '',
  didReceiveAttrs: function(){
    let title = this.getData('title');
    let body = this.getData('body');
    let date = this.getData('published-at');
    let blogId = this.blog.id;
    let authorId = this.user.data.id;
    let firstName = this.blogsIncluded({ id: authorId, type: 'users', attribute: 'first-name'});
    let lastName = this.blogsIncluded({ id: authorId, type: 'users', attribute: 'last-name'});
    let author = firstName + ' ' + lastName;
    let categoryId = this.category.data.id;
    let category = this.blogsIncluded({ id: categoryId, type: 'categories', attribute: 'name', lowerCase: true}) + 's';
    let categoryName = this.blogsIncluded({ id: categoryId, type: 'categories', attribute: 'name'});

    this.set('blogTitle', title);
    this.set('blogBody', body);
    this.set('blogRoute', category + '.show');
    this.set('blogId', blogId);
    this.set('publishedAt', date);
    this.set('author', author);
    this.set('authorId', authorId);
    this.set('categoryRoute', category + '.index');
    this.set('category', categoryName);
    this.set('categoryRoute', category + '.index');
  },
  getData: function(attribute){
    return this.blog.attributes[attribute];
  },
  blogsIncluded: function(options) {
    let attributeValue = this.included.filterBy('type', options.type).findBy('id', options.id).attributes[options.attribute];

    if (!Ember.isEmpty(options.lowerCase) && options.lowerCase){
      attributeValue = attributeValue.toLowerCase();
    }

    return attributeValue;
  }
});
