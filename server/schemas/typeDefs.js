const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    password: String! # Hashed password
    watchlist: [Anime]!
  }

  type Anime {
    _id: ID!
    title: String!
    genre: String!
    description: String!
  }

  type Query {
    # User-related queries
    me: User
    getUserById(userId: ID!): User

    # Anime-related queries
    getAllAnime: [Anime]
    getAnimeById(animeId: ID!): Anime
  }

  type Mutation {
    # User-related mutations
    signup(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User

    # Watchlist-related mutations
    addToWatchlist(animeId: ID!): User
    removeFromWatchlist(animeId: ID!): User
    markAsWatched(animeId: ID!): User
  }
`;
module.exports = typeDefs;