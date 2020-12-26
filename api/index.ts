import { combineReducers } from 'redux';
import githubThunk from './github_thunk/reducer';
import githubThunkTypesafe from './github_thrunk_typesafe/reducer';
import githubSagaReducer from './saga/reducer';
import { all } from 'redux-saga/effects';
import { githubSaga } from './saga/saga';

const rootReducer = combineReducers({
  githubThunk,
  githubThunkTypesafe,
  githubSagaReducer
});

export function* rootSaga() {
  yield all([githubSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
