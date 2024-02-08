import { useState, useEffect } from 'react';

const SavedAnime = () => {
  const [savedAnime, setSavedAnime] = useState([]);

  useEffect(() => {
    // Retrieve saved anime from local storage when component mounts
    const storedAnime = localStorage.getItem('savedAnime');
    if (storedAnime) {
      setSavedAnime(JSON.parse(storedAnime));
    }
  }, []);

  const handleDeleteAnime = (animeId) => {
    // Remove anime from savedAnime state and update local storage
    const updatedAnime = savedAnime.filter((anime) => anime.animeId !== animeId);
    setSavedAnime(updatedAnime);
    localStorage.setItem('savedAnime', JSON.stringify(updatedAnime));
    console.log('Anime deleted successfully!');
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
