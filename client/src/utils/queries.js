import { gql } from '@apollo/client';

// setup for User data and any saved anime data
export const GET_ME = gql`
  {
    me {
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
`;
