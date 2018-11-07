import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = {
    items: [
        { id: uuid(), name: 'Iphone', description: 'My first iphone.'},
        { id: uuid(), name: 'Samsung', description: 'My second iphone.'},
        { id: uuid(), name: 'Nokia', description: 'My third iphone.'}
    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
        return {
            ...state
        };
        default:
            return state;
    }
}