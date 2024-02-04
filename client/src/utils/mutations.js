import { gql } from '@apollo/client';

// User login controls
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// User sign in controls
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        animeCount
        savedAnime {
          animeId
          title
          genre
          description
        }
      }
    }
  }
`;

// Save anime to user's collection
export const SAVE_ANIME = gql`
  mutation saveAnime($newAnime: InputAnime!) {
    saveAnime(newAnime: $newAnime) {
      _id
      username
      email
      savedAnime {
        animeId
        title
        genre
        description
      }
    }
  }
`;

// Remove anime from user's collection
export const REMOVE_ANIME = gql`
  mutation removeAnime($animeId: ID!) {
    removeAnime(animeId: $animeId) {
      _id
      username
      email
      savedAnime {
        animeId
        title
        genre
        description
      }
    }
  }
`;