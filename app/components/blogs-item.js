import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['blog-item', 'col-md-12'],
  author: '',
  category: '',
  categoryRoute: '',
  blogRoute: '',
  blogId: 0,
  didReceiveAttrs: function(){
    let authorId = this.user.data.id;
    let author = this.blogsIncluded({ id: authorId, type: 'users', attribute: 'full-name'});
    let categoryId = this.category.data.id;
    let category = this.blogsIncluded({ id: categoryId, type: 'categories', attribute: 'name', lowerCase: true}) + 's';
    let categoryName = this.blogsIncluded({ id: categoryId, type: 'categories', attribute: 'name'});

    this.set('blogRoute', category + '.show');
    this.set('blogId', this.blog.id);
    this.set('author', author);
    this.set('categoryRoute', category + '.index');
    this.set('category', categoryName);
    this.set('categoryRoute', category + '.index');
  },
  blogsIncluded: function(options) {
    let attributeValue = this.included.filterBy('type', options.type).findBy('id', options.id).attributes[options.attribute];

    if (!Ember.isEmpty(options.lowerCase) && options.lowerCase){
      attributeValue = attributeValue.toLowerCase();
    }

    return attributeValue;
  }
});
