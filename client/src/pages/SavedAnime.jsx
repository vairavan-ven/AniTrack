import { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { GET_ME } from '../utils/queries';
import { REMOVE_ANIME } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';

const SavedAnime = () => {
  const [savedAnime, setSavedAnime] = useState([]);

  // Query to fetch user's saved anime data
  const { loading, data } = useQuery(GET_ME);

  // Mutation to remove anime from user's collection
  const [removeAnime] = useMutation(REMOVE_ANIME);

  useEffect(() => {
    if (!loading && data) {
      setSavedAnime(data.me.savedAnime);
    }
  }, [loading, data]);

  const handleDeleteAnime = async (animeId) => {
    try {
      const token = Auth.getToken();
      await removeAnime({ variables: { animeId }, context: { headers: { authorization: `Bearer ${token}` } } });
      setSavedAnime(savedAnime.filter((anime) => anime.animeId !== animeId));
      console.log('Anime deleted successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Saved Anime</h1>
      <div>
        {savedAnime.map((anime) => (
          <div key={anime.animeId}>
            <h2>{anime.title}</h2>
            <p>{anime.description}</p>
            <button onClick={() => handleDeleteAnime(anime.animeId)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedAnime;
