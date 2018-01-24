const topicService = require('./topics.service');
// const async = require('async');

let TopicController = {
  addNewTopic: function(newTopic, onCompleteCallback) {
    topicService.addNewTopic(newTopic, onCompleteCallback);
  },
  getAllTopics: function(onCompleteCallback) {
    topicService.getAllTopics(onCompleteCallback);
  },
  getTopic: function(topicName, onCompleteCallback) {
    topicService.getTopic(topicName, onCompleteCallback);
  }
}

module.exports = TopicController;
