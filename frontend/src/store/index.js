import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import albumsReducer from './albums';
import artistReducer from './artists';
import audioReducer from './audioPlayer';
import commentReducer from './comments';
import likesReducer from './likes';
import searchReducer from './search';
import sessionReducer from './session';
import songReducer from './songs';

const rootReducer = combineReducers({
    session: sessionReducer,
    songs: songReducer,
    comments: commentReducer,
    audio: audioReducer,
    artists: artistReducer,
    search: searchReducer,
    albums: albumsReducer,
    likes: likesReducer,
});



let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
