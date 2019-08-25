import { combineReducers } from 'redux';

import * as State from '../state';

import {
    initialState as appInitialState,
    reducer as appReducer
} from './app';

import {
    initialState as commonInitialState,
    reducers as commonReducers
} from './common'; 
 
export const initialState: State.Root = {
    app: appInitialState,
    common: commonInitialState
};

export const reducers = combineReducers<State.Root>({
    app: appReducer,
    common :commonReducers
});