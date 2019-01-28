import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profildReducer from './profileReducer';

export default combineReducers({
    auth: authReducer,
    item: itemReducer,
    profile: profildReducer,
    errors: errorReducer
});