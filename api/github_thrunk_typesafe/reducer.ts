import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_SUCCESS
} from './actions';
import { GitHubAction, GithubSate } from './types';
import produce from 'immer';
import { createReducer } from 'typesafe-actions';

const initialState: GithubSate = {
  userProfile: {
    loading: false,
    data: null,
    error: null
  }
};

const reducer = createReducer<GithubSate, GitHubAction>(initialState, {
  [GET_USER_PROFILE]: state =>
    produce(state, draft => {
      draft.userProfile.loading = true;
    }),
  [GET_USER_PROFILE_SUCCESS]: (state, action) =>
    produce(state, draft => {
      draft.userProfile.loading = false;
      draft.userProfile.data = action.payload;
    }),
  [GET_USER_PROFILE_ERROR]: (state, action) =>
    produce(state, draft => {
      draft.userProfile.loading = false;
      draft.userProfile.error = action.payload;
    })
});

export default reducer;
