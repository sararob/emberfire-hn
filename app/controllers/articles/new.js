import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    actions: {
        addArticle: function() {
            var ref = new Firebase('https://test-stuff.firebaseio.com/');
            var authData = ref.getAuth();

            if (authData) {
                var article = this.store.createRecord('article', {
                    url: this.get('url'),
                    title: this.get('title'),
                    submitted: new Date().getTime()
                });
                this.store.find('user', authData.uid).then(function(user) {
                    article.set('user', user);
                    article.save().then(function() {
                        user.get('articles').addObject(article);
                        user.save();
                    });
                });
                this.setProperties({
                    url: '',
                    title: ''
                });
                this.transitionToRoute('articles');
            } else {
                console.log('You must log in to post an article');
            }
        }
    }
});
