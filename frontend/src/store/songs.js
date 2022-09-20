// import { csrfFetch } from "./csrf";

const LOAD_SONGS = 'songs/loadSongs'
const SONG_DETAILS = 'songs/songDetails'

const loadSongs = (songs) => {
    return {
        type: LOAD_SONGS,
        songs
    }
}

const songDetails = (details) => {
    return {
        type: SONG_DETAILS,
        details
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

export const fetchSongDetails = (id) => async (dispatch) => {
    const response = await fetch(`/api/songs/${id}`);

    if (response.ok) {
        const buttcheeks = await response.json();
        dispatch(songDetails(buttcheeks));
        return buttcheeks
    }
    return null;
}

const initialState = {songs: {}, singleSong:{}}

const songReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_SONGS:
            Object.values(action.songs.Songs).map((song) => (newState[song.id] = song))
            return newState
        case SONG_DETAILS:
            newState = { ...state, singleSong:{...state[action.details.id]} }
            return newState;
        default:
            return state
    }
}

export default songReducer;
