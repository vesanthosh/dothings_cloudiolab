import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    item: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state, // keeping the current state or something like that.
                item: action.payload, // updating initialState with action.payload
                loading: false // Disablling loading spinner once we get all the data.
            };
        case ADD_ITEM:
            return {
                ...state,
                item: [...state.item, action.payload]
            };
        case UPDATE_ITEM:
            return {
                ...state,
                item: [...state.item, action.payload]
            };
        case DELETE_ITEM:
            return {
                ...state,
                item: state.item.filter(item => item._id !== action.payload)
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true // This will display loading spinner while all the data is loading.
            };
        default:
            return state;
    }
}