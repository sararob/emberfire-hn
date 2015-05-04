import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        upvote: function(article) {
            var ref = this.store.adapterFor('article')._getRef();
            var articleId = article.get('id');
            ref.child('articles').child(articleId).child('votes').transaction(function(currentVotes) {
                return (currentVotes || 0) + 1;
            }, function(err, committed, snapshot) {
                if (snapshot) {
                    var user = article.get('user').get('id');
                    ref.child('users').child(user).child('votes').child(articleId).set(true);
                }
            });
        }
    }
});
