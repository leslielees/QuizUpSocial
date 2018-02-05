const mongoose = require ('mongoose');

let schema = new mongoose.Schema({
  playerId: { type: Number, unique: true, required: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String },
  },
  nickname: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  totalGamesPlayed: { type: Number },
}, { collection: 'players' });

// Composite Unique key
schema.index({
  playerId: 1,
  nickname: '',
  email: '',
}, {
  unique: true
});

//Creating the model, model is the runtime object instance of the schema
module.exports = mongoose.model("players", schema);
