const mongoose = require ('mongoose');

let schema = new mongoose.Schema({
  postId: { type: Number, unique: true, required: true },
  playerId: { type: Number, unique: true, required: true },
  topicId: { type: Number, unique: true, required: true },
  title: { type: String },
  comments: { type: String }
}, { collection: 'posts' });

// Composite Unique key
schema.index({
  postId: 1,
  playerId: 1,
  topicId: 1,
}, {
  unique: true
});

//Creating the model, model is the runtime object instance of the schema
module.exports = mongoose.model("posts", schema);