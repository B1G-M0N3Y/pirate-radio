// import { crsfFetch } from "./csrf"

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
        console.log('reducer comments', comments)
        dispatch(loadComments(comments));
        return comments
    }
    return null
}

const initialState = {  }

const commentReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_COMMENTS:
            const allComments = {}
            action.comments.comments.forEach(comment => {
                allComments[comment.id] = comment;
            });
            return {
                ...allComments,
                ...state,
            };

        default:
            return state
    }
}

export default commentReducer;
