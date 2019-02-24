import axios from 'axios';
import { logoutUser } from './authActions';
import { GET_ERRORS, GET_CURRENT_USER_PROFILE, PROFILES_LOADING, CLEAR_CURRENT_USER_PROFILE, GET_PUBLIC_PROFILES, GET_PUBLIC_USER_PROFILE } from './types';

// Get public profiles
export const getPublicProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile/all')
        .then(res => dispatch({
            type: GET_PUBLIC_PROFILES,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PUBLIC_PROFILES,
            payload: {}
        }));
}

// Get public profile by handle
export const getPublicProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/${handle}`)
        .then(res => dispatch({
            type: GET_PUBLIC_USER_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PUBLIC_USER_PROFILE,
            payload: null
        }));
}

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => dispatch({
            type: GET_CURRENT_USER_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_CURRENT_USER_PROFILE,
            payload: {}
        }));
}

// Delete account & Profile
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This can not be undone!')) {
        axios.delete('/api/profile')
            .then(res => dispatch(
                logoutUser()
            )).catch(err => dispatch({
                type: GET_ERRORS,
                payload: {}
            }));
    }
}

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios.post('api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILES_LOADING
    }
}

// Clear the data on the state before gets logged out
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_USER_PROFILE
    }
}