import { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { saveAnime, searchAnime } from '../utils/API';

const SearchAnime = () => {
  const [animeData, setAnimeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    searchAnimedb();
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await searchAnime(searchQuery);
      const data = await response.json();
      setAnimeData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveAnime = async (anime) => {
    try {
      const token = Auth.getToken();
      await saveAnime(anime, token);
      console.log('Anime saved successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Search Anime</h1>
      <input type="text" value={searchQuery} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      <div>
        {animeData.map((anime) => (
          <div key={anime.id}>
            <h2>{anime.title}</h2>
            <p>{anime.description}</p>
            <button onClick={() => handleSaveAnime(anime)}>Save</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAnime;
