import { GET_UPCOMING_TODOS, GET_SINGLE_UPCOMING_TODO, ADD_TODO, TODOS_LOADING, CLEAR_CURRENT_TODOS, GET_COMPLETED_TODOS, UPDATE_UPCOMING_TODO, UPDATE_COMPLETED_TODO, DELETE_UPCOMING_TODO, DELETE_COMPLETED_TODO, SET_UPCOMING_TODO_DONE, SET_COMPLETED_TODO_UNDONE } from '../actions/types';

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
                upcomingTodos: action.payload.filter(upcomingTodos => upcomingTodos.isCompleted === false)
            };
        case UPDATE_UPCOMING_TODO:
            return {
                ...state,
                upcomingTodos: action.payload.filter(upcomingTodos => upcomingTodos.isCompleted === false)
            };
        case UPDATE_COMPLETED_TODO:
            return {
                ...state,
                completedTodos: action.payload.filter(completedTodos => completedTodos.isCompleted === true)
            };
        case SET_UPCOMING_TODO_DONE:
            return {
                ...state,
                upcomingTodos: action.payload.filter(upcomingTodos => upcomingTodos.isCompleted === false),
                completedTodos: action.payload.filter(completedTodos => completedTodos.isCompleted === true)
            };
        case SET_COMPLETED_TODO_UNDONE:
            return {
                ...state,
                upcomingTodos: action.payload.filter(upcomingTodos => upcomingTodos.isCompleted === false),
                completedTodos: action.payload.filter(completedTodos => completedTodos.isCompleted === true)
            };
        case DELETE_UPCOMING_TODO:
            return {
                ...state,
                upcomingTodos: action.payload.filter(upcomingTodos => upcomingTodos.isCompleted === false)
            };
        case DELETE_COMPLETED_TODO:
            return {
                ...state,
                completedTodos: action.payload.filter(completedTodos => completedTodos.isCompleted === true)
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