import { GET_UPCOMING_TODOS, GET_SINGLE_UPCOMING_TODO, ADD_TODO, UPDATE_TODO, DELETE_TODO, TODOS_LOADING, CLEAR_CURRENT_TODOS, GET_COMPLETED_TODOS } from '../actions/types';

const initialState = {
    upcomingTodos: null,
    completedTodos: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_UPCOMING_TODOS:
            return {
                ...state, // keeping the current state or something like that.
                upcomingTodos: action.payload, // updating initialState with action.payload
                loading: false // Disablling loading spinner once we get all the data.
            };
        case GET_COMPLETED_TODOS:
            return {
                ...state, // keeping the current state or something like that.
                completedTodos: action.payload, // updating initialState with action.payload
                loading: false // Disablling loading spinner once we get all the data.
            };
        case GET_SINGLE_UPCOMING_TODO:
            return {
                ...state, // keeping the current state or something like that.
                upcomingTodos: action.payload, // updating initialState with action.payload
                loading: false // Disablling loading spinner once we get all the data.
            };
        case ADD_TODO:
            return {
                ...state,
                upcomingTodos: action.payload
            };
        case UPDATE_TODO:
            return {
                ...state,
                upcomingTodos: action.payload
            };
        case DELETE_TODO:
            return {
                ...state,
                upcomingTodos: action.payload
            };
        case TODOS_LOADING:
            return {
                ...state,
                loading: true // This will display loading spinner while all the data is loading.
            };
        case CLEAR_CURRENT_TODOS:
            return {
                ...state,
                upcomingTodos: null,
                completedTodos: null
            };
        default:
            return state;
    }
}