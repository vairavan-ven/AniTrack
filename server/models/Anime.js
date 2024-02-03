const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedAnime` array in User.js
const animeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  // saved anime id or unique identifier
  animeId: {
    type: String,
    required: true,
  },
});

module.exports = animeSchema;
