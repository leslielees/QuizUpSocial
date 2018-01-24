const mongoose = require ('mongoose');

let schema = new mongoose.Schema({
  postId: {type: Number, unique: true, required: true},
  postedBy: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'players' }],
  //topicId: { type: Number, required: true }, - we dont need topic ID as topic already contains posts reference
  title: { type: String }
}, { collection: 'posts' });

// Composite Unique key
schema.index({
  postId: 1
}, {
  unique: true
});

//Creating the model, model is the runtime object instance of the schema
module.exports = mongoose.model("posts", schema);