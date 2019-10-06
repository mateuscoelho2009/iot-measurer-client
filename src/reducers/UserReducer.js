import { UserActionTypes } from "../actions/ActionTypes";

const initialState = {
    userId: localStorage.getItem('userId'),
    username: localStorage.getItem('username'),
    measurements: localStorage.getItem('measurements'),
};

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.LOG_OUT:
            localStorage.removeItem('measurements');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            return {
                ...state,
                userId: '',
                username: '',
                measurements: [],
            };
        default:
            return state;
    }
};
