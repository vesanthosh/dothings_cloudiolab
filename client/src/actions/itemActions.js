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

export const addTodoItem = (itemData, history) => dispatch => {
    axios.post('/api/todoItem', itemData)
        .then(res => history.push('/dashboard'))
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

// export const addItem = (item) => dispatch => {
//     axios.post('/api/items', item)
//         .then(res => dispatch({
//             type: ADD_ITEM,
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

// export const deleteItem = (_id) => dispatch => { // This _id could be anything.
//     axios.delete(`/api/items/${_id}`)
//         .then(res => dispatch({
//             type: DELETE_ITEM,
//             payload: _id
//         }));
// };

// export const setItemsLoading = () => {
//     return {
//         type: ITEMS_LOADING
//     };
// };

// Profile loading
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