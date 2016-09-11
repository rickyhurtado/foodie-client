import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Mixin.create({
  session: service('session'),
  currentUser: {
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

    let session = this.get('session');
    let authSession = session.session.content.authenticated;
    let currentUser = this.get('currentUser');

    this.set('currentUser.token', authSession.token);
    this.set('currentUser.role', authSession.role);
    this.set('currentUser.email', authSession.email);
    this.set('currentUser.firstName', authSession.first_name);
    this.set('currentUser.lastName', authSession.last_name);
    this.set('currentUser.fullName', authSession.first_name + ' ' + authSession.last_name);
    this.set('currentUser.role', authSession.role);
    this.set('currentUser.isAdmin', authSession.role === 'Admin');
  }
});
