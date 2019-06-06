import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profildReducer from './profileReducer';

export default combineReducers({
    auth: authReducer,
    todoItems: todoReducer,
    profiles: profildReducer,
    errors: errorReducer
});