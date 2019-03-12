import { GET_ERRORS, GET_UPCOMING_TODOS, GET_SINGLE_UPCOMING_TODO, ADD_TODO, TODOS_LOADING, CLEAR_CURRENT_TODOS, GET_COMPLETED_TODOS, UPDATE_UPCOMING_TODO, DELETE_UPCOMING_TODO, DELETE_COMPLETED_TODO } from './types';
import axios from 'axios';

// Get list of upcoming todo items
export const getUpcomingTodoItems = () => dispatch => {
    axios.get('/api/todoItem/allupcoming')
        .then(res =>
            dispatch({
                type: GET_UPCOMING_TODOS,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_UPCOMING_TODOS,
                payload: err.response.data
            }));
}

// Get list of completed todo items
export const getCompletedTodoItems = () => dispatch => {
    axios.get('/api/todoItem/allcompleted')
        .then(res =>
            dispatch({
                type: GET_COMPLETED_TODOS,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_COMPLETED_TODOS,
                payload: err.response.data
            }));
}

// Get single todo item
export const getSingleTodoItem = (id) => dispatch => {
    axios.get(`/api/todoItem/${id}`)
        .then(res =>
            dispatch({
                type: GET_SINGLE_UPCOMING_TODO,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
}

// Add todo item
export const addTodoItem = (itemData) => dispatch => {
    axios.post('/api/todoItem', itemData)
        .then(res => dispatch({
            type: ADD_TODO,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

// delete todo items
export const deleteUpcomingTodoItem = (id) => dispatch => {
    axios.delete(`/api/todoItem/${id}`)
        .then(res => dispatch({
            type: DELETE_UPCOMING_TODO,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

// delete todo items
export const deleteCompletedTodoItem = (id) => dispatch => {
    axios.delete(`/api/todoItem/${id}`)
        .then(res => dispatch({
            type: DELETE_COMPLETED_TODO,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

// Update todo item // TODO: improve the state
export const editUpcomingTodoItem = (id, item) => dispatch => {
    axios.put(`/api/todoItem/${id}`, item)
        .then(res => dispatch({
            type: UPDATE_UPCOMING_TODO,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

// Item loading
export const setItemLoading = () => {
    return {
        type: TODOS_LOADING
    }
}

// Clear the data on the state before gets logged out
export const clearCurrentTodoItem = () => {
    return {
        type: CLEAR_CURRENT_TODOS
    }
}