// import { csrfFetch } from "./csrf";

import { csrfFetch } from "./csrf"

const LOAD_SONGS = 'songs/loadSongs'
const SONG_DETAILS = 'songs/songDetails'
const ADD_SONG = 'songs/addSong'
const UPDATE_SONG = 'songs/updateSong'

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

const updateSong = (song) => {
    return {
        type: UPDATE_SONG,
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
        dispatch(songDetails(song));
        return song;
    }
    return null;
}

export const editSong = song => async dispatch => {
    // console.log(song)
    const response = await csrfFetch(`/api/songs/${song.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(song)
    })
    if (response.ok) {
        const song = await response.json();
        dispatch(updateSong(song))
        return song;
    }
    return null
}

const initialState = { songs: {}, singleSong: {} }

const songReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_SONGS:
            Object.values(action.songs.Songs).map((song) => (newState[song.id] = song))
            return newState
        case SONG_DETAILS:
            return {
                ...state,
                [action.details.id]: action.details,
                singleSong: { ...action.details }
            }
        case UPDATE_SONG:
            newState = {...state, singleSong: {...action.song}}
            newState[action.song.id] = action.song
        default:
            return state
    }
}

export default songReducer;
