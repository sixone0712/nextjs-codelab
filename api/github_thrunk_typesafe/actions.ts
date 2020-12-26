import { GitHubProfile } from '../axios/github';
import { AxiosError } from 'axios';
import { createAsyncAction, createAction } from 'typesafe-actions';

export const GET_USER_PROFILE = 'github_thunk_typesafe/GET_USER_PROFILE' as const;
export const GET_USER_PROFILE_SUCCESS = 'github_thunk_typesafe/GET_USER_PROFILE_SUCCESS' as const;
export const GET_USER_PROFILE_ERROR = 'github_thunk_typesafe/GET_USER_PROFILE_ERROR' as const;

// export const getUserProfile = createAction(GET_USER_PROFILE)();
// export const getUserProfileSuccess = createAction(
//   GET_USER_PROFILE_SUCCESS
// )<GitHubProfile>();
// export const getUserProfileError = createAction(
//   GET_USER_PROFILE_ERROR
// )<AxiosError>();

export const getUserProfileAsync = createAsyncAction(
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR
)<undefined, GitHubProfile, AxiosError>();
