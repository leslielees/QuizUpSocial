const PostModel = require('./posts.entity');

const addPost = function(newPost, done) {
  let post = new PostModel();
  post.playerId = newPost.playerId;
  post.topicId = newPost.topicId;
  post.title = newPost.title;
  post.comment = newPost.comment;


  post.save(function(err, savedDoc) {
    if (err) {
      console.error("Error in adding new post, ERROR::", err);
      done(err);
    } else {
      done(null, savedDoc);
      return
    }
  });
};

const getAllPosts = function(done) {
  let query = {};
  let fieldOptions = null;
  let page = 1;
  let limit = 10;

  PostModel
    .find(query)
    .sort({ "popularity": -1 })
    .select(fieldOptions)
    //.skip((page > 0) ? limit * (page - 1) : 0)
    //.limit(limit)
    .exec((err, postColln) => {
      if (err) {
        console.error('Error in finding topics, ERROR::', err, ' queries for ', query);
        done(err);
        return;
      }
      done(null, postColln);
    });
};

const getPostById = function(postId, done) {
  PostModel.findOne({ postId: postId}, function (err, postColln){
    if (err) {
      console.error('Error in finding the specified topic, ERROR::', err, ' queries for ', query);
      done(err);
      return;
    }
    done(null, postColln);
  });
};

const getPostsByPlayer = function(playerId, done) {
  PostModel.find({ playerId: playerId}, function (err, postColln) {
    if (err) {
      console.error('Error in finding the post created by the player, ERROR::', err, ' queries for ', query);
      done(err);
      return;
    }
    done(null, postColln);
  });
};

const getPostsByTopic = function(topicName, done) {
  PostModel.find({ topicName: topicName}, function (err, postColln) {
    if (err) {
      console.error('Error in finding the post to the mentioned topic, ERROR::', err, ' queries for ', query);
      done(err);
      return;
    }
    done(null, postColln);
  });
};

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  getPostsByPlayer,
  getPostsByTopic
};
