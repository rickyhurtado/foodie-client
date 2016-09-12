import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Mixin.create({
  session: service('session'),
  currentUser: {
    id: null,
    token: null,
    role: null,
    email: null,
    firstName: null,
    lastName: null,
    fullName: null,
    isAdmin: false
  },
  init: function(){
    this._super();
    this.initAuthSession();
  },
  initAuthSession: function(){
    let session = this.get('session');
    let authSession = session.session.content.authenticated;
    let fullName = authSession.firstName + ' ' + authSession.lastName;
    let isAdmin = authSession.role === 'Admin';

    this.set('currentUser.id', authSession.userId);
    this.set('currentUser.token', authSession.token);
    this.set('currentUser.role', authSession.role);
    this.set('currentUser.email', authSession.email);
    this.set('currentUser.firstName', authSession.firstName);
    this.set('currentUser.lastName', authSession.lastName);
    this.set('currentUser.fullName', fullName);
    this.set('currentUser.isAdmin', isAdmin);
  }
});
