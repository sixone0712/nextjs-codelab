import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_SUCCESS
} from './actions';
import { GitHubAction, GithubSate } from './types';
import produce from 'immer';

const initialState: GithubSate = {
  userProfile: {
    loading: false,
    data: null,
    error: null
  }
};

const reducer = (state: GithubSate = initialState, action: GitHubAction) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return produce<GithubSate>(state, draft => {
        draft.userProfile.loading = true;
      });
    case GET_USER_PROFILE_SUCCESS:
      return produce<GithubSate>(state, draft => {
        draft.userProfile.data = action.data;
        draft.userProfile.loading = false;
      });
    case GET_USER_PROFILE_ERROR:
      return produce<GithubSate>(state, draft => {
        draft.userProfile.error = action.error;
        draft.userProfile.loading = false;
      });

    default:
      return state;
  }
};

export default reducer;
