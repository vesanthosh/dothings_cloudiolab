import { GET_ITEMS, GET_SINGLE_ITEM, ADD_ITEM, ITEMS_LOADING, GET_ERRORS, CLEAR_CURRENT_TODOITEM, DELETE_ITEM, UPDATE_ITEM } from './types';
import axios from 'axios';

// Get list of todo items
export const getTodoItems = () => dispatch => {
    dispatch(setItemLoading());
    axios.get('/api/todoItem/all')
        .then(res =>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_ITEMS,
                payload: err.response.data
            }));
}

// Get single todo item
export const getSingleTodoItem = (id) => dispatch => {
    dispatch(setItemLoading());
    axios.get(`/api/todoItem/${id}`)
        .then(res =>
            dispatch({
                type: GET_SINGLE_ITEM,
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
            type: ADD_ITEM,
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
            type: DELETE_ITEM,
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
            type: UPDATE_ITEM,
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
        type: ITEMS_LOADING
    }
}

// Clear the data on the state before gets logged out
export const clearCurrentTodoItem = () => {
    return {
        type: CLEAR_CURRENT_TODOITEM
    }
}