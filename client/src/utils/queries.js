const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    animeCount: Int
    savedAnime: [Anime]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Anime {
    animeId: ID!
    title: String
    genre: String
    description: String
  }

  input InputAnime {
    animeId: String
    title: String
    genre: String
    description: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveAnime(newAnime: InputAnime!): User
    removeAnime(animeId: ID!): User
  }
`;

module.exports = typeDefs;
