const TopicModel = require('./topics.entity');

const noError = null;
const TopicService = {
  addNewTopic: function(newTopic, onCompleteCallback) {
    let topic = new TopicModel();
    topic.topicId = newTopic.topicId;
    topic.topicName = newTopic.topicName;
    topic.description = newTopic.description;
    topic.image = newTopic.image;
    topic.popularity = newTopic.popularity;
  
  
    topic.save(function(err, savedDoc) {
      if (err) {
        console.error("Error in adding new topic, ERROR::", err);
        onCompleteCallback(err);
      } else {
        onCompleteCallback(noError, savedDoc);
        return;
      }
    });
  },
  getAllTopics: function(onCompleteCallback) {
    let query = {};
    let fieldOptions = null;
    let page = 1;
    let limit = 10;
  
    TopicModel
      .find(query)
      .sort({ "popularity": -1 })
      .select(fieldOptions)
      //.skip((page > 0) ? limit * (page - 1) : 0)
      //.limit(limit)
      .populate("posts")
      .exec((err, topicColln) => {
        if (err) {
          console.error('Error in finding topics, ERROR::', err, ' queries for ', query);
          onCompleteCallback(err);
          return;
        }
        onCompleteCallback(noError, topicColln);
      });
  },
  getTopic: function(topicName, onCompleteCallback) {
    TopicModel.findOne({ topicName: topicName}, function (err, topicColln){
      if (err) {
        console.error('Error in finding the specified topic, ERROR::', err, ' queries for ', query);
        onCompleteCallback(err);
        return;
      }
      onCompleteCallback(noError, topicColln);
    });
  }

}

module.exports = TopicService;
