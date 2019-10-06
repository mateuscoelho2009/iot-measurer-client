import { UserActionTypes } from "../actions/ActionTypes";
import firebase from 'firebase';

const initialState = {
    userId: localStorage.getItem('userId'),
    username: localStorage.getItem('username'),
    measurements: localStorage.getItem('measurements'),
};

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.LOG_OUT:
            firebase.auth().signOut();

            localStorage.removeItem('measurements');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            return {
                ...state,
                userId: '',
                username: '',
                measurements: [],
            };
        case UserActionTypes.LOG_IN:
            const {
                userId,
                username,
                measurements,
            } = action.payload;
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', username);
            localStorage.setItem('measurements', measurements);

            return {
                ...state,
                userId,
                username,
                measurements,
            };
        default:
            return state;
    }
};
