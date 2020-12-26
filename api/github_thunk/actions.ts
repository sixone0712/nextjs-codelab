import { GitHubProfile } from '../axios/github';
import { AxiosError } from 'axios';

export const GET_USER_PROFILE = 'github_thunk/GET_USER_PROFILE' as const;
export const GET_USER_PROFILE_SUCCESS = 'github_thunk/GET_USER_PROFILE_SUCCESS' as const;
export const GET_USER_PROFILE_ERROR = 'github_thunk/GET_USER_PROFILE_ERROR' as const;

export interface ActionGetUserProfile { 
  type: typeof GET_USER_PROFILE;
}

export interface ActionGetUserProfilSuccess {
  type: typeof GET_USER_PROFILE_SUCCESS;
  data: GitHubProfile;
}

export interface ActionGetUserProfileError {
  type: typeof GET_USER_PROFILE_ERROR;
  error: AxiosError;
}

export const actionGetUserProfile = () => ({ type: GET_USER_PROFILE });
export const actionGetUserProfileSuccess = (data: GitHubProfile) => ({
  type: GET_USER_PROFILE_SUCCESS,
  data
});
export const actionGetUserProfileError = (error: AxiosError) => ({
  type: GET_USER_PROFILE_ERROR,
  error
});
