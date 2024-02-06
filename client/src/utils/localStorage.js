export const getSavedAnimeIds = () => {
    return JSON.parse(localStorage.getItem('saved_anime')) || [];
  };
  
  export const saveAnimeIds = (animeIdArr) => {
    if (animeIdArr.length) {
      localStorage.setItem('saved_anime', JSON.stringify(animeIdArr));
    } else {
      localStorage.removeItem('saved_anime');
    }
  };
  
  export const removeAnimeId = (animeId) => {
    let savedAnimeIds = getSavedAnimeIds();
    
    if (!savedAnimeIds.includes(animeId)) {
      return false;
    }
  
    savedAnimeIds = savedAnimeIds.filter((savedAnimeId) => savedAnimeId !== animeId);
    localStorage.setItem('saved_anime', JSON.stringify(savedAnimeIds));
  
    return true;
  };
  