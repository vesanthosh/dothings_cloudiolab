import { GET_ITEMS, ADD_ITEM, ITEMS_LOADING, GET_ERRORS, CLEAR_CURRENT_TODOITEM } from './types';
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

// Add todo item
export const addTodoItem = (itemData, history) => dispatch => {
    axios.post('/api/todoItem', itemData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

// delete todo items
export const deleteTodoItem = (id) => dispatch => {
    axios.delete(`/api/todoItem/${id}`)
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};


// export const getItems = () => dispatch => {
//     dispatch(setItemsLoading());
//     axios.get('/api/items')
//         .then(res => dispatch({
//             type: GET_ITEMS,
//             payload: res.data
//         }));
// };

// export const updateItem = (item) => dispatch => {
//     axios.put(`/api/items/${item._id}`, item)
//         .then(res => dispatch({
//             type: UPDATE_ITEM,
//             payload: res.data
//         }));
// };

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