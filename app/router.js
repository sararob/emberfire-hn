import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('articles', {path: '/'}, function() {
    this.route('new');
  });
  this.resource('users', function() {
    this.route('new');
  });
});
