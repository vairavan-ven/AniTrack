import { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { getMe, deleteAnime } from '../utils/API';

const SavedAnime = () => {
  const [savedAnime, setSavedAnime] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Auth.getToken();
        const response = await getMe(token);
        const userData = await response.json();
        setSavedAnime(userData.savedAnime);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteAnime = async (animeId) => {
    try {
      const token = Auth.getToken();
      await deleteAnime(animeId, token);
      setSavedAnime(savedAnime.filter((anime) => anime.id !== animeId));
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
          <div key={anime.id}>
            <h2>{anime.title}</h2>
            <p>{anime.description}</p>
            <button onClick={() => handleDeleteAnime(anime.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedAnime;