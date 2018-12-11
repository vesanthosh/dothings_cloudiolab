import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

// Basic Redux store setup
const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

// // Advanced Redux store setup to resolve problems from different browser without no dev extensions. In PRODUCTION.
// const composeEnhancers = typeof window === 'object' && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// const enhancer = composeEnhancers(applyMiddleware(...middleware));

// const store = createStore(rootReducer, initialState, enhancer);

export default store;