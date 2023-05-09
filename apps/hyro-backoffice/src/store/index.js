import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
//import * as reduxPersist from 'redux-persist';
//import storage from 'redux-persist/lib/storage';

import api from '../middlewares/api';
import reducers from '../reducers';

const middlewares = [thunk, api];

const bindedMiddleware = composeWithDevTools(applyMiddleware(...middlewares));

const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(reducers, {}, bindedMiddleware);
  } else {
    //If it's on client side, create a store which will persis
    /* const persistConfig = {
            key: 'root',
            storage,
            whiteList: [
                'user',
            ],
            blacklist: []
        };*/

    //const persistedReducer = reduxPersist.persistReducer(persistConfig, reducers);

    const store = createStore(reducers, {}, bindedMiddleware);

    //store.__persisitor = reduxPersist.persistStore(store);

    return store;
  }
};

export const wrapper = createWrapper(makeStore, { debug: true });
