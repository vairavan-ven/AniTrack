const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Import schema for Anime
const animeSchema = require('./Anime');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // Set savedAnime to be an array of data that adheres to the animeSchema
    savedAnime: [animeSchema],
  },
  // Set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// When we query a user, we'll also get another field called `animeCount` with the number of saved anime
userSchema.virtual('animeCount').get(function () {
  return this.savedAnime.length;
});

const User = model('User', userSchema);

module.exports = User;
