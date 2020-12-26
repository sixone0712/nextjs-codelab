import { axiosGetUserProfile } from '../axios/github';
import {
  actionGetUserProfile,
  actionGetUserProfileSuccess,
  actionGetUserProfileError
} from './actions';

export const getUserProfileThunk = (username: string) => async dispatch => {
  dispatch(actionGetUserProfile());
  try {
    const data = await axiosGetUserProfile(username);
    dispatch(actionGetUserProfileSuccess(data));
  } catch (error) {
    dispatch(actionGetUserProfileError(error));
    throw error;
  }
};
