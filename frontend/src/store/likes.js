import { csrfFetch } from "./csrf";

const LOAD_SONG_LIKES = (likes) => {
    return{
        type: LOAD_SONG_LIKES,
        likes
    }
}

const LIKE_SONG = () => {
    return{
        
    }
}

const initialState = {}

const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SONG_LIKES:
            return {...action.likes.likes}
        default:
            return state;
    }
}

export default likesReducer;
