const postService = require('./posts.service');

let PostController = {
    addPost: function(newPost, done) {
        postService.addPost(newPost, done);
    },
    getAllPosts: function(done) {
      postService.getAllPosts(done);
    },
    getPostById: function(postId, done) {
        postService.getPostById(postId, done);
    },
    getPostsByPlayer: function(playerId, done) {
        postService.getPostsByPlayer(playerId, done);
    },
    getPostsByTopic: function(topicName, done) {
        postService.getPostsByTopic(topicName, done);
    }
}

module.exports = PostController;