import { crsfFetch } from "./csrf"

const LOAD_COMMENTS = 'comments/loadComments'

const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

export const fetchComments = (id) => async (dispatch) => {
    const response = await fetch(`/api/songs/${id}/comments`);

    if (response.ok) {
        const comments = await response.json();

        dispatch(loadComments(comments));
        return comments;
    }
}

const initialState = { comments: {}, singleComment: {} }

const commentReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_COMMENTS:
            Object.values(action.comments).map((comment) => (newState[comment.id] = comment))
            return newState;
        default:
            return state
    }
}

export default commentReducer;
