import { csrfFetch } from "./csrf"

const LOAD_SONGS = 'songs/loadSongs'
const LOAD_RANDOM_SONGS = 'songs/loadRandomSongs'
const LOAD_COUNT = 'songs/loadCount'
const SONG_DETAILS = 'songs/songDetails'
const UPDATE_SONG = 'songs/updateSong'
const DELETE_SONG = 'songs/deleteSong'

const loadSongs = (songs) => {
    return {
        type: LOAD_SONGS,
        songs
    }
}

const loadRandomSongs = (songs) => {
    return {
        type: LOAD_RANDOM_SONGS,
        songs
    }
}

const loadCount = (count) => {
    return {
        type: LOAD_COUNT,
        count
    }
}

const songDetails = (details) => {
    return {
        type: SONG_DETAILS,
        details
    }
}

const updateSong = (song) => {
    return {
        type: UPDATE_SONG,
        song
    }
}

const deleteSong = (id) => {
    return {
        type: DELETE_SONG,
        id
    }
}

export const fetchSongs = (page = 1) => async (dispatch) => {
    const response = await fetch(`/api/songs?page=${page}`);

    if (response.ok) {
        const songs = await response.json();
        dispatch(loadSongs(songs));
        return songs;
    }
}

export const fetchSongDetails = (id) => async (dispatch) => {
    let response = await fetch(`/api/songs/${id}`);

    if (response.ok) {
        const song = await response.json();
        dispatch(songDetails(song));
        return song
    }
    return null;
}

export const fetchSongCount = () => async (dispatch) => {
    let response = await fetch('/api/songs/count')

    if (response.ok) {
        const count = await response.json();
        dispatch(loadCount(count));
        return count
    }
}

export const fetchRandomSongs = () => async (dispatch) => {
    let response = await fetch('/api/songs/random');

    if (response.ok) {
        const songs = await response.json();
        dispatch(loadRandomSongs(songs))
        return songs
    }
}

export const createNewSong = (song) => async dispatch => {
    const { title, description, songFile, image, albumId } = song;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (albumId){
        formData.append('albumId', albumId);
    }
    formData.append('songFiles', songFile);
    formData.append('songFiles', image);

    console.log('formdata song', songFile)
    console.log('formdata iamge', image)

    const response = await csrfFetch("/api/songs", {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    });

    if (response.ok) {
        const song = await response.json();
        dispatch(songDetails(song));
        return song;
    }
    return null;
}

export const editSong = song => async dispatch => {
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

export const deleteSingleSong = id => async dispatch => {
    const response = await csrfFetch(`/api/songs/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const message = await response.json();
        dispatch(deleteSong(id));
        return message;
    }
}

const initialState = { songs: [], singleSong: {}, count:undefined }

const songReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_SONGS:
            newState.count = state?.count
            newState.songs = {}
            Object.values(action.songs.Songs).map((song) => (newState.songs[song.id] = song))
            return newState;
        case LOAD_RANDOM_SONGS:
            action.songs.songs.map(song => (
                newState[song.id] = song
            ))
            return newState
        case LOAD_COUNT:
            newState = {...state};
            newState.count = action.count;
            return newState;
        case SONG_DETAILS: {
            // const newState = {...state}
            return {
                ...state,
                [action.details.id]: action.details,
                singleSong: { ...action.details }
            };
        }
        case UPDATE_SONG:
            newState = { ...state, singleSong: { ...action.song } };
            newState[action.song.id] = action.song;
            break
        case DELETE_SONG:
            newState = { ...state }
            delete newState[action.id];
            return newState;
        default:
            return state
    }
}

export default songReducer;
