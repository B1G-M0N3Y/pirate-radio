import { csrfFetch } from "./csrf"

const LOAD_AUDIO = 'songs/loadAudio'


const loadAudio = (audio) => {
    return {
        type: LOAD_AUDIO,
        audio
    }
}


export const fetchAudioDetails = (id) => async (dispatch) => {
    console.log('in the audio fetch')
    const response = await fetch(`/api/songs/${id}`);

    if (response.ok) {
        const audio = await response.json();
        dispatch(loadAudio(audio));
        return audio
    }
    return null;
}

const initialState = { currentAudio: {} }

const audioReducer = (state = initialState, action) => {
    // let newState = {}
    switch (action.type) {
        case LOAD_AUDIO:
            return {
                currentAudio: { ...action.audio }
            };
        default:
            return state
    }
}

export default audioReducer;
