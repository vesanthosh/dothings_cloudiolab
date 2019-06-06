import { PROFILES_LOADING, GET_CURRENT_USER_PROFILE, CLEAR_CURRENT_USER_PROFILE, GET_PUBLIC_PROFILES, GET_PUBLIC_USER_PROFILE } from '../actions/types';

const initialState = {
    currentUserProfile: null,
    publicProfiles: null,
    publicUserProfile: null,
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
        case GET_PUBLIC_PROFILES:
            return {
                ...state,
                publicProfiles: action.payload,
                loading: false
            };
        case GET_PUBLIC_USER_PROFILE:
            return {
                ...state,
                publicUserProfile: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_USER_PROFILE:
            return {
                ...state,
                currentUserProfile: null,
                publicProfiles: null,
                publicUserProfile: null
            };
        default:
            return state;
    }
}