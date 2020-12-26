import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { GitHubProfile } from '../axios/github';

export const GET_USER_PROFILE = 'github_saga/GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'github_saga/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'github_saga/GET_USER_PROFILE_ERROR';

export const getUserProfileAsyncSaga = createAsyncAction(
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR
)<string, GitHubProfile, AxiosError>();
