import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Correct named import
import { settingsReducer } from './settingsReducer';

const rootReducer = combineReducers({
  users: settingsReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
