const topicService = require('./topics.service');
// const async = require('async');

const addNewTopic = function(newProduct, done) {
  topicService.addNewTopic(newProduct, done);
}

const getAllTopics = function(done) {
  topicService.getAllTopics(done);
}

const getTopic = function(topicName, done) {
  topicService.getTopic(topicName, done);
}

module.exports = {
  addNewTopic,
  getAllTopics,
  getTopic
}
