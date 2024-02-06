import React, { useState } from 'react';
import seedData from '../utils/seedData';

const SearchAnime = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [savedAnime, setSavedAnime] = useState([]);

  const handleSearch = () => {
    const results = seedData.filter(anime => anime.title.toLowerCase().includes(searchInput.toLowerCase()));
    setSearchResults(results);
  };

  const handleSaveAnime = (anime) => {
    setSavedAnime([...savedAnime, anime]);
  };

  return (
    <div>
      <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.map(anime => (
          <div key={anime.id}>
            <h2>{anime.title}</h2>
            <p>{anime.description}</p>
            <button onClick={() => handleSaveAnime(anime)}>Save Anime</button>
          </div>
        ))}
      </div>

      <div>
        <h3>Saved Anime:</h3>
        {savedAnime.map(anime => (
          <div key={anime.id}>
            <h2>{anime.title}</h2>
            <p>{anime.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAnime;
