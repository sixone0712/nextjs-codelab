import { createStore, applyMiddleware, Middleware, StoreEnhancer } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import ReduxThunks from 'redux-thunk';
import rootReducer, { rootSaga } from '../api';
import createSagaMiddleware from 'redux-saga';

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore: MakeStore<{}> = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    {},
    bindMiddleware([ReduxThunks, sagaMiddleware])
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper<{}>(makeStore, { debug: true });
