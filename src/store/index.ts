import { createStore as createReduxStore, Store, applyMiddleware } from 'redux'
import { multiClientMiddleware } from 'redux-axios-middleware';

import { create } from './hook';

import * as State from './state';
import { Action } from './actions';
import { reducers, initialState } from './reducers';
import { createClients } from './clients'

export const createStore = (headers: any) => {
  const clients = createClients(headers)
  const store: Store<State.Root> = createReduxStore(
    reducers,
    initialState,
    applyMiddleware(
      multiClientMiddleware(clients)
    )
  ); 
  return store
}

export const { StoreContext, useDispatch, useMappedState } = create<
  State.Root,
  Action,
  Store<State.Root>
>();
