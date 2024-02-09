import { gql } from '@apollo/client';

// setup for User data and any saved anime data

export const GET_ME = gql`
  {
    me {
      username
    }
  }
`;
// Query to get the saved anime data
export const GET_ANIME = gql`
  {
    me {
      savedAnime {
        animeId
        title
        genre
        description
      }
    }
  }
`;