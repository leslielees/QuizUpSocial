const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  topicId: { type: String, required: true },
  topicName: { type: String, unique: true, required: true },
  description: { type: String },
  image: { type: String },
  popularity: { type: Number },

  //reference
  posts: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts'
  }]
}, { collection: 'topics' });

// Composite Unique key
schema.index({
  topicName: ''
}, {
  unique: true
});

//Creating the model, model is the runtime object instance of the schema
module.exports = mongoose.model("topics", schema);
