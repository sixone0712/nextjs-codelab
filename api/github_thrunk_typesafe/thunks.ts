import { ThunkAction } from 'redux-thunk';
import { getUserProfileAsync } from './actions';
import { axiosGetUserProfile, GitHubProfile } from '../axios/github';
import { GitHubAction, GithubSate } from './types';
import createAsyncThunk from '../lib/createAsyncThunk';

// export function getUserProfileThunkTypesafe(
//   username: string
// ): ThunkAction<void, GithubSate, null, GitHubAction> {
//   return async dispatch => {
//     const { request, success, failure } = getUserProfileAsync;
//     dispatch(request(null, null));
//     try {
//       const userProfile: GitHubProfile = await axiosGetUserProfile(username);
//       dispatch(success(userProfile));
//     } catch (e) {
//       dispatch(failure(e));
//     }
//   };
// }

export const getUserProfileThunkTypesafe = createAsyncThunk(
  getUserProfileAsync,
  axiosGetUserProfile
);
