import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Route.extend({
    session: Ember.inject.service(),
    beforeModel: function() {
        var _this = this;
        var ref = new Firebase('https://test-stuff.firebaseio.com/');
        var authData = ref.getAuth();
        if (authData) {
            this.store.find('user', authData.uid).then(function(user) {
                _this.get('session').set('user', user);
            });
        }
    }
});
