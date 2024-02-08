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
    // Retrieve saved anime from local storage and parse it to an array of objects
    const storedAnime = JSON.parse(localStorage.getItem('savedAnime')) || [];
    console.log('Stored Anime:', storedAnime); // Log stored anime before deletion
    console.log('Anime ID to delete:', animeId); // Log animeId parameter
  
    // Filter out the anime with the specified animeId
    const updatedAnime = storedAnime.filter(anime => {
        console.log('Anime ID in stored anime:', anime.animeId);
        return anime.animeId !== animeId;
    });
    console.log('Updated Anime:', updatedAnime); // Log updated anime after deletion
  
    // Update local storage with the updated anime list
    localStorage.setItem('savedAnime', JSON.stringify(updatedAnime));
    
    // Update the state with the updated anime list
    setSavedAnime(updatedAnime);
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
