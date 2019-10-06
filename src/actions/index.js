import { UserActionTypes } from "./ActionTypes";

export const logOut = () => ({
    type: UserActionTypes.LOG_OUT,
});

export const logIn = (userId, username) => {
    return {
        type: UserActionTypes.LOG_IN,
        payload: {
            userId,
            username,
            measurements: [],
        },
    };
};
