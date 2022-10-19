import { csrfFetch } from "./csrf";

const LOAD_ARTISTS = "artists/loadArtists";
const ARTIST_DETAILS = "artists/artistsDetails";
const CLEAR_CURR_ARTIST = "artists/clearCurrArtist"

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

export const clearCurrArtist = () => {
  return {
    type: CLEAR_CURR_ARTIST
  }
}

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
  const songsFetch = await fetch (`/api/artists/${id}/songs`);

  if (response.ok) {
    const artist = await response.json();
    const songs = await songsFetch.json();

    const singleArtist = { ...artist, ...songs}

    dispatch(artistDetails(singleArtist));
    return singleArtist;
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
      case CLEAR_CURR_ARTIST:
        newState = {...state}
        newState.singleArtist = {}
        return newState
    default:
      return state;
  }
};

export default artistReducer;
