import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['blog-content'],
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
    let blogId = this.blog.data.id;
    let authorId = this.getRel({ type: 'user', attribute: 'id' });
    let firstName = this.blogIncluded({ id: authorId, type: 'users', attribute: 'first-name'});
    let lastName = this.blogIncluded({ id: authorId, type: 'users', attribute: 'last-name'});
    let author = firstName + ' ' + lastName;
    let categoryId = this.getRel({ type: 'category', attribute: 'id' });
    let category = this.blogIncluded({ id: categoryId, type: 'categories', attribute: 'name', lowerCase: true}) + 's';
    let categoryName = this.blogIncluded({ id: categoryId, type: 'categories', attribute: 'name'});

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

    window.scrollTo(0, 0);
  },
  getData: function(attribute){
    return this.blog.data.attributes[attribute];
  },
  getRel: function(options){
    return this.blog.data.relationships[options.type].data[options.attribute];
  },
  blogIncluded: function(options) {
    let included = this.blog.included;
    let attributeValue = included.filterBy('type', options.type).findBy('id', options.id).attributes[options.attribute];

    if (!Ember.isEmpty(options.lowerCase) && options.lowerCase){
      attributeValue = attributeValue.toLowerCase();
    }

    return attributeValue;
  },
  setBody: function(blogBody){
    let text = document.createElement('textarea');

    text.innerHTML = blogBody;

    return text.value;
  },
  actions: {
    goBack: function(){
      history.back();
    }
  }
});
