const PostModel = require('./posts.entity');
const TopicModel = require('../topics/topics.entity');
const PlayerModel = require('../players/players.entity');

const addPost = function(newPost, done) {
  let post = new PostModel();
  post.postId = newPost.postId;
  post.topicId = newPost.topicId;
  post.title = newPost.title;

  PlayerModel
    .findOne({"email": newPost.email})
    .select('_id')
    .exec(function (err, targetPlayer) {

      if (err) {
        console.error("Error in finding the player details, ERROR::", err);
        done(err);
      }
      post.postedBy.push(targetPlayer._id);
      post.save(function(err, savedDoc) {
        if (err) {
          console.error("Error in adding new post, ERROR::", err);
          done(err);
        } else {
          //console.log(TopicModel.findOne({"topicId": savedDoc.topicId.toString()}));
          TopicModel
            .findOne({"topicId": savedDoc.topicId.toString()})
            .exec(function(err, targetTopic) {
              targetTopic.posts.push(savedDoc._id);
              targetTopic.save((err, savedTopic) => {
                if (err) {
                    console.error("Error in updating reference in topics, ERROR::", err);
                    done(err);
                    return;
                } else {
                    done(null, savedDoc);
                    return;
                }
              }); 
            });
          return;
        }
      });
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
    .populate("players")
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
  PostModel
    .findOne({ postId: postId})
    .populate("players")
    .exec(err, function (err, postColln){
      if (err) {
        console.error('Error in finding the specified topic, ERROR::', err, ' queries for ', query);
        done(err);
        return;
      }
      done(null, postColln);
      return;
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
