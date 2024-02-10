import React, { useState, useEffect } from 'react';

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
    // Retrieve saved anime from local storage and parse it to an array of objects
    const storedAnime = JSON.parse(localStorage.getItem('savedAnime')) || [];
  
    // Filter out the anime with the specified animeId
    const updatedAnime = storedAnime.filter(anime => anime.animeId !== animeId);
  
    // Update local storage with the updated anime list
    localStorage.setItem('savedAnime', JSON.stringify(updatedAnime));
    
    // Update the state with the updated anime list
    setSavedAnime(updatedAnime);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h1 style={{ fontSize: '24px', color: '#333' }}>Saved Anime</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px' }}>
        {savedAnime.map((anime) => (
          <div key={anime.animeId} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h2>{anime.title}</h2>
            <p>{anime.description}</p>
            <button
              style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', marginTop: '10px' }}
              onClick={() => handleDeleteAnime(anime.animeId)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedAnime;
