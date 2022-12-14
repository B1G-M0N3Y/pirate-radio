import { csrfFetch } from "./csrf"

const LOAD_COMMENTS = 'comments/loadComments'
const ADD_COMMENT = 'comments/addComment'
const DELETE_COMMENT = 'comments/deleteComment'

const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

const addComment = comment => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

const deleteComment = (id) => {
    return {
        type: DELETE_COMMENT,
        id
    }
}

export const fetchComments = (id) => async (dispatch) => {
    const response = await fetch(`/api/songs/${id}/comments`);

    if (response.ok) {
        const comments = await response.json();
        dispatch(loadComments(comments));
        return comments
    }
    return null
}

export const createNewComment = (comment, id) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${id}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const comment = await response.json();
        dispatch(addComment(comment));
        return comment;
    }
    return null;
}

export const deleteSingleComment = (id) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const message = await response.json();
        dispatch(deleteComment(id));
        return message;
    }
}

const initialState = {}

const commentReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_COMMENTS:
            // const allComments = {}
            // action.comments.comments.forEach(comment => {
            //     allComments[comment.id] = comment;
            // });
            return {
                ...action.comments.comments
            };
        case ADD_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        case DELETE_COMMENT:
            newState = {...state}
            delete newState[action.id];
            return newState;
        default:
            return state
    }
}

export default commentReducer;
