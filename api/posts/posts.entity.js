const mongoose = require ('mongoose');

let schema = new mongoose.Schema({
  postId: { type: Number, unique: true, required: true },
  playerId: { type: Number, required: true },
  topicName: { type: Number, required: true },
  title: { type: String },
  comment: { type: String }
}, { collection: 'posts' });

// Composite Unique key
schema.index({
  postId: 1
}, {
  unique: true
});

//Creating the model, model is the runtime object instance of the schema
module.exports = mongoose.model("posts", schema);