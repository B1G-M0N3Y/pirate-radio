// import { csrfFetch } from "./csrf";

import { csrfFetch } from "./csrf"

const LOAD_SONGS = 'songs/loadSongs'
const SONG_DETAILS = 'songs/songDetails'
const ADD_SONG = 'songs/addSong'

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

const addSong = (song) => {
    return {
        type: ADD_SONG,
        song
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
    let response;

    response = await fetch(`/api/songs/${id}`);

    if (response.ok) {
        const song = await response.json();
        dispatch(songDetails(song));
        return song
    }
    return null;
}

export const createNewSong = (song) => async dispatch => {
    const response = await csrfFetch("/api/songs", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
    });
    if (response.ok) {
        const song = await response.json();
        dispatch(addSong(song));
        return song;
    }
    return null;
}

const initialState = { songs: {}, singleSong: {} }

const songReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_SONGS:
            Object.values(action.songs.Songs).map((song) => (newState[song.id] = song))
            return newState
        case SONG_DETAILS:
            newState = { ...state, singleSong: { ...state[action.details.id] } }
            return newState;
        case ADD_SONG:
            newState = { ...state, [action.song.id]: action.song }
            return state;
        default:
            return state
    }
}

export default songReducer;
