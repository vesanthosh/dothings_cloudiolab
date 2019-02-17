import { GET_ERRORS, GET_UPCOMING_TODOS, GET_SINGLE_UPCOMING_TODO, ADD_TODO, DELETE_TODO, UPDATE_TODO, TODOS_LOADING, CLEAR_CURRENT_TODOS } from './types';
import axios from 'axios';

// Get list of todo items
export const getTodoItems = () => dispatch => {
    axios.get('/api/todoItem/all')
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
export const deleteTodoItem = (id) => dispatch => {
    axios.delete(`/api/todoItem/${id}`)
        .then(res => dispatch({
            type: DELETE_TODO,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

// Update todo item // TODO: improve the state
export const editTodoItem = (id, item) => dispatch => {
    axios.put(`/api/todoItem/${id}`, item)
        .then(res => dispatch({
            type: UPDATE_TODO,
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