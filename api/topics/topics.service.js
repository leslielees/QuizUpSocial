const TopicModel = require('./topics.entity');

const addNewTopic = function(newTopic, done) {
  let topic = new TopicModel();
  topic.name = newTopic.name;
  topic.description = newTopic.description;
  topic.image = newTopic.image;
  topic.popularity = newTopic.popularity;


  topic.save(function(err, savedDoc) {
    if (err) {
      console.error("Error in adding new topic, ERROR::", err);
      done(err);
    } else {
      done(null, savedDoc);
      return
    }
  });
}

const getAllTopics = function(done) {
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
    .exec((err, colln) => {
      if (err) {
        console.error('Error in finding topics, ERROR::', err, ' queries for ', query);
        done(err);
        return;
      }
      done(null, colln);
    });
}

const getTopic = function(topicName, done) {
  TopicModel.findOne({ topicName: topicName}, function (err, doc){
    // doc is a Document
  });
}
