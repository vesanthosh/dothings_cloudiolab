import { PROFILES_LOADING, GET_CURRENT_USER_PROFILE, CLEAR_CURRENT_USER_PROFILE } from '../actions/types';

const initialState = {
    profile: {},
    profiles: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILES_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_CURRENT_USER_PROFILE:
            return {
                ...state,
                currentUserProfile: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_USER_PROFILE:
            return {
                ...state,
                currentUserProfile: null
            }
        default:
            return state;
    }
}