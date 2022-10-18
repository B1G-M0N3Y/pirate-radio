import { csrfFetch } from "./csrf";

const LOAD_ARTISTS = "artists/loadArtists";

const loadArtists = (artists) => {
  return {
    type: LOAD_ARTISTS,
    artists,
  };
};

export const fetchArtists = () => async (dispatch) => {
  const response = await fetch(`/api/artists`);

  if (response.ok) {
    const artists = await response.json();
    dispatch(loadArtists(artists));
    return artists;
  }
  return null;
};

const initialState = {};

const artistReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_ARTISTS:
      Object.values(action.artists.Artists).map(
        (artist) => (newState[artist.id] = artist)
      );
      return newState;
    default:
      return state;
  }
};

export default artistReducer;
