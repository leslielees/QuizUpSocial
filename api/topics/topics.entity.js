const mongoose = require('mongoose');

let schema = new mongoose.schema({
  topicId: { type: String, required: true },
  topicName: { type: String, unique: true, required: true },
  description: { type: String },
  image: { type: String },
  popularity: { type: Number }
});

// Composite Unique key
schema.index({
  topicName: 1
}, {
  unique: true
});

//Creating the model, model is the runtime object instance of the schema
module.exports = mongoose.model("topics", schema);
