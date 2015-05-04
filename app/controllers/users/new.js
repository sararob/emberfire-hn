import Ember from 'ember';
// import config from '/config/environment';
import Firebase from 'firebase';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    actions: {
        createAccount: function() {
            var ref = new Firebase('https://test-stuff.firebaseio.com/');
            var email = this.get('email');
            var password = this.get('password');
            var _this = this;
            var store = this.get('store');

            ref.createUser({
                email: email,
                password: password
            }, function (err, user) {
                if (err) {
                    console.log(err);
                } else if (user) {
                    ref.authWithPassword({
                        email: email,
                        password: password
                    }, function (error, authData) {
                        if (error) {
                            console.log('err', error);
                        } else {
                            var newUser = store.createRecord('user', {
                                id: authData.uid,
                                email: authData.password.email
                            });
                            newUser.save().then(function(resolve, reject) {
                                if (resolve) {
                                    var thisSession = _this.get('session');
                                    thisSession.set('user', newUser);
                                    _this.transitionToRoute('articles');
                                } else {
                                    console.log('user not saved');
                                }
                            });
                        }
                    });
                }
            });
        }
    }
});
