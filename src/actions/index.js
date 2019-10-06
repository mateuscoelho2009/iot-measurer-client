import { UserActionTypes } from "./ActionTypes";
import firebase from 'firebase';

export const logOut = () => ({
    type: UserActionTypes.LOG_OUT,
});

export const logIn = (userId, username, measurements) => {
    return {
        type: UserActionTypes.LOG_IN,
        payload: {
            userId,
            username,
            measurements,
        },
    };
};
