const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT authentication

const User = require('./models/User'); // Import your User model
const Anime = require('./models/Anime'); // Import your Anime model

const resolvers = {
  Query: {
    // User-related queries
    me: (_, __, context) => context.user, // Assumes user is attached to the context after authentication
    getUserById: async (_, { userId }) => {
      try {
        return await User.findById(userId);
      } catch (error) {
        throw new Error('Error fetching user by ID');
      }
    },

    // Anime-related queries
    getAllAnime: async () => {
      try {
        return await Anime.find();
      } catch (error) {
        throw new Error('Error fetching all anime');
      }
    },
    getAnimeById: async (_, { animeId }) => {
      try {
        return await Anime.findById(animeId);
      } catch (error) {
        throw new Error('Error fetching anime by ID');
      }
    },
  },

  Mutation: {
    // User-related mutations
    signup: async (_, { username, email, password }) => {
      try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // You may want to generate and return a JWT token for immediate login
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        return { ...user._doc, _id: user._id.toString(), token };
      } catch (error) {
        throw new Error('Error creating a new user');
      }
    },
    login: async (_, { email, password }) => {
      // Implement login logic, verify credentials, and generate a JWT token
    },

    // Watchlist-related mutations
    addToWatchlist: async (_, { animeId }, context) => {
      // Implement logic to add anime to the user's watchlist
    },
    removeFromWatchlist: async (_, { animeId }, context) => {
      // Implement logic to remove anime from the user's watchlist
    },
    markAsWatched: async (_, { animeId }, context) => {
      // Implement logic to mark anime as watched in the user's watchlist
    },
  },
};



module.exports = resolvers;