import { combineReducers } from 'redux';
import { UserReducer } from './UserReducer';

export const Reducers = combineReducers({
  userState: UserReducer,
});
