import { csrfFetch } from "./csrf";

const LOAD_USER_ALBUMS = "albums/loadUserAlbums";

const loadUserAlbums = (albums) => {
  return {
    type: LOAD_USER_ALBUMS,
    albums,
  };
};

export const loadCurrUserAlbums = () => async (dispatch) => {
  const response = await csrfFetch("/api/albums/current");

  if (response.ok) {
    const albums = await response.json();
    dispatch(loadUserAlbums(albums));
    return albums;
  }
};

const initialState = {};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_ALBUMS:
      return { ...action.albums.albums };
    default:
      return state;
  }
};

export default albumsReducer;
