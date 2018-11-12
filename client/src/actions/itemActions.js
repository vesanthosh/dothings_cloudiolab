import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }));
};

export const addItem = (item) => dispatch => {
    axios.post('/api/items', item)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }));
};

export const updateItem = (item) => dispatch => { // This _id could be anything. need to workout
    axios.put(`/api/items/${item._id}`)
        .then(res => dispatch({
            type: UPDATE_ITEM,
            payload: res.data
        }));
};

export const deleteItem = (_id) => dispatch => { // This _id could be anything.
    axios.delete(`/api/items/${_id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: _id
        }));
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};