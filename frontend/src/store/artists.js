import { csrfFetch } from "./csrf";

const LOAD_ARTISTS = "artists/loadArtists";
const ARTIST_DETAILS = "artists/artistsDetails";

const loadArtists = (artists) => {
  return {
    type: LOAD_ARTISTS,
    artists,
  };
};

const artistDetails = (details) => {
  return {
    type: ARTIST_DETAILS,
    details,
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

export const fetchArtistDetails = (id) => async (dispatch) => {
  const response = await fetch(`/api/artists/${id}`);

  if (response.ok) {
    const artist = await response.json();
    dispatch(artistDetails(artist));
    return artist;
  }
};

const initialState = {singleArtist: {}};

const artistReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_ARTISTS:
      //   Object.values(action.artists).map(
      //     (artist) => (newState[artist.id] = artist)
      //   );
      //   return newState;
      return { ...action.artists.artists };
    case ARTIST_DETAILS:
      return {
        ...state,
        [action.details.id]: action.details,
        singleArtist: { ...action.details },
      };
    default:
      return state;
  }
};

export default artistReducer;
