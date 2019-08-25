import { combineReducers } from 'redux';

import {State} from '../../state/common';

import {
    initialState as attachInitialState,
    reducer as attachReducer
} from './attach';

export const initialState: State = {
    attach: attachInitialState,
};

export const reducers = combineReducers<State>({
    attach: attachReducer
});