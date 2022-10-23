const SEARCH_RESULTS = "search-results/";

const searchResults = (results) => {
  return {
    type: SEARCH_RESULTS,
    results,
  };
};

export const fetchSearchResults = (query) => async (dispatch) => {
  const songs = await fetch(`/api/songs?search=${query}`);
  const artists = await fetch(`/api/artists?search=${query}`);

  if (songs.ok && artists.ok) {
    const songsJSON = await songs.json();
    const artistsJSON = await artists.json();

    const results = [ ...songsJSON.Songs , ...artistsJSON.artists ];

    dispatch(searchResults(results));
    return results;
  }
};

const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return { ...action.results };
    default:
      return state;
  }
};

export default searchReducer;
