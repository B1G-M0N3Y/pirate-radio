import { csrfFetch } from "./csrf";

const LOAD_SONGS = 'songs/loadSongs'

const loadSongs = (songs) => {
    return {
        type: LOAD_SONGS,
        songs
    }
}

export const fetchSongs = () => async (dispatch) => {
    const response = await fetch('/api/songs');

    if (response.ok) {
        const songs = await response.json();
        dispatch(loadSongs(songs));
        return songs;
    }
}

const initialState = {}

const songReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_SONGS:
            Object.values(action.songs.Songs).map((song) => (newState[song.id] = song))
            return newState
        default:
            return state
    }
}

export default songReducer;
